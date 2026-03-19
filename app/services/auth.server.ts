import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import  bcrypt  from "bcryptjs";
import User from "../db/models/User";

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

    async function verifyUser(email: string, password: string){
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