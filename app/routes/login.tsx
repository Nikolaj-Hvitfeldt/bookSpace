import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { authenticator } from "../services/auth.server";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  try {
    const user = await authenticator.authenticate("form", request);
    if (!user) {
      return redirect("/login");
    }

    return redirect("/");
  } catch (error) {
    return { error: "Invalid email or password" };
  }
}

const text = "Welcome,\nLog in to continue";

export default function Login({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();
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

          <div className="flex w-full justify-center mt-auto gap-4">
            <Button
              type="submit"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Log in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
