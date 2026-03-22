import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { authenticator } from "../services/auth.server";
import { Button } from "../components/ui/button";
import { SearchBar } from "../components/ui/searchbar";
import { Input } from "../components/ui/input";

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
  return (
    <div>
      <div className="w-full text-left mt-[clamp(20px,4vh,32px)]">
        <h1 className="onboarding-title whitespace-pre-line">{text}</h1>
      </div>

      <div className="flex flex-col mt-[clamp(20px,4vh,32px)]">
        <Form method="post" className="flex flex-col space-y-4">
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2"
          />
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2"
          />
        </Form>
      </div>
    </div>
  );
}
