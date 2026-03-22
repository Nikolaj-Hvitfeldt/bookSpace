import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { authenticator } from "../services/auth.server";
import { Button } from "../components/ui/button";
import { SearchBar } from "../components/ui/searchbar";
import { DropdownMenu } from "../components/ui/dropdownMenu";
import { useState } from "react";

export default function Login({ actionData }: Route.ComponentProps) {
  const [chosenLabel, setChosenLabel] = useState<string | null>(null);

  const options = [
    { label: "test1", value: "test1" },
    { label: "test2", value: "test2" },
  ];

  const testLabel = options.find(
    (option) => option.value === chosenLabel,
  )?.label;

  return (
    <div>
      <h1>Login</h1>

      <Form method="post" className="flex flex-col space-y-4">
        <label className="block" htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="block" htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2"
          />
        </label>

        {/* Show error message if there is one */}
        {actionData?.error ? (
          <div className="text-red-600">
            <p>{actionData?.error}</p>
          </div>
        ) : null}
        <div className="flex justify-center">
          <Button type="submit">Primary Button</Button>
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="secondary">
            Secondary Button
          </Button>
        </div>
      </Form>

      <SearchBar placeholder="Search..." />

      <DropdownMenu
        options={options}
        value={chosenLabel || "Select an option"}
        onChange={setChosenLabel}
        label={testLabel || ""}
      />
    </div>
  );
}

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
