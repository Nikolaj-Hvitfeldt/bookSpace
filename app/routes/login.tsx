import { data, Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { authenticator } from "../services/auth.server";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { sessionStorage } from "../services/session.server";
import User from "~/db/models/User";

export async function action({ request }: Route.ActionArgs) {
  try {
    const user = await authenticator.authenticate("form", request);
    const onboardingCompleteData = await User.findById(user._id)
      .select("onboardingComplete")
      .lean();

    if (!user) {
      return redirect("/login");
    }

    const session = await sessionStorage.getSession(
      request.headers.get("Cookie"),
    );
    session.set("user", user);

    if (onboardingCompleteData?.onboardingComplete === true) {
      return redirect("/", {
        headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
      });
    }

    return redirect("/onboarding/favorite-books", {
      headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
  } catch (error) {
    if (error instanceof Error) {
      return data({ error: "Invalid email or password" });
    }
  }
}

const text = "Welcome,\nLog in to continue";

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div className="w-full text-left mt-[clamp(20px,4vh,32px)]">
        <h1 className="onboarding-title whitespace-pre-line">{text}</h1>
      </div>

      <div className="flex flex-1 mt-[clamp(20px,4vh,32px)]">
        <Form method="post" className="flex flex-col flex-1 gap-4">
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

          {/* Show error message if there is one - Maybe update to Toast later on. Would be sick*/}
          {actionData?.error ? (
            <p className="text-red-600!" role="alert">
              {actionData?.error}
            </p>
          ) : null}

          <div className="flex w-full justify-center mt-auto gap-4">
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
