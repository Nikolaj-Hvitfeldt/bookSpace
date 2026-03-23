import type { Route } from "./+types/signup";
import { data, Form, redirect } from "react-router";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import User from "~/db/models/User";
import { validateSignupFormData } from "~/util/validators/signupvalidators";
import { sessionStorage } from "../services/session.server";

const text = "Welcome,\nSign up to continue";

export default function Signup({ actionData }: Route.ComponentProps) {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div className="w-full text-left mt-[clamp(20px,4vh,32px)]">
        <h1 className="onboarding-title whitespace-pre-line">{text}</h1>
      </div>

      <div className="flex flex-1 mt-[clamp(20px,4vh,32px)]">
        <Form method="post" className="flex flex-col flex-1 gap-2">
          <Input
            label="Name"
            id="displayName"
            type="text"
            name="displayName"
            placeholder="Display Name"
            className="flex min-h-0"
          />

          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="flex min-h-0"
          />
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="min-h-0"
          />

          {actionData?.error ? (
            <p className="text-red-600!" role="alert">
              {actionData?.error}
            </p>
          ) : null}

          <div className="flex w-full justify-center mt-auto gap-4">
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();

    const userData = Object.fromEntries(formData);

    validateSignupFormData({
      email: userData.email as string,
      password: userData.password as string,
      displayName: userData.displayName as string,
    });

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return data({ error: "User already exists" });
    }

    const newUser = await User.create({
      email: userData.email as string,
      password: userData.password as string,
      displayName: userData.displayName as string,
      onboardingComplete: false,
    });

    const session = await sessionStorage.getSession(
      request.headers.get("Cookie"),
    );
    session.set("user", newUser._id.toString());
    return redirect("/onboarding/favorite-books", {
      headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
  } catch (error) {
    if (error instanceof Error) {
      return data({ error: error.message });
    }
  }
}
