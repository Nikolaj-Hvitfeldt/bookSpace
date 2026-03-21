import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import  bcrypt  from "bcryptjs";
import User, {type UserType} from "../db/models/User";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator<{_id: string}>();

authenticator.use(
    new FormStrategy(async ({ form }) => {
        const email = form.get("email");
        const password = form.get("password");

        if (!email || typeof email !== "string" || !email.trim()) {
            throw new Error("Email is required and must be a string");
          }

          if (!password || typeof password !== "string" || !password.trim()) {
            throw new Error("Password is required and must be a string");
          }

          const userId = await verifyUser(email, password);
          return { _id: userId };
        }), "form"
    );

    export async function verifyUser(email: string, password: string){
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            throw new Error("User not found");
    }

        if(!user.password){
            throw new Error("Password not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid password");
        }
            return user._id.toString();
}


type SessionUser = {
    _id: string;
  };

  export type UserData = Pick<UserType, "_id" | "email" | "displayName" | "onboardingComplete">;

  export async function getUser(
    request: Request,
  ): Promise<SessionUser | undefined> {
    const session = await sessionStorage.getSession(
      request.headers.get("Cookie"),
    );
    return session.get("user");
  }


 export async function getUserData(request: Request): Promise<UserData | null> {
    const userFromSession = await getUser(request);

    if(!userFromSession || !userFromSession._id) {
        return null;
    }
        
    const user = await User.findById(userFromSession._id)
    .select("_id email displayName")
    .lean();

    if(!user) {
        return null;
    }
    return user;
 }

export async function requireUser(request: Request) {
    const user = await getUserData(request);
    if (!user) {
      throw new Response("You must be signed in to view this page.", {
        status: 401,
        statusText: "Unauthorized",
      });
    }
    return user;
  }