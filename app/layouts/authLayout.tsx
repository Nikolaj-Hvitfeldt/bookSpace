import { Outlet, redirect, } from "react-router";
import type { Route } from "./+types/authLayout";
import { getUserData } from "~/services/auth.server";

export async function loader({request}: Route.LoaderArgs) {
    const user = await getUserData(request);
    if (user) {
        return redirect("/");
    }
}
export default function AuthLayout() {
  return (
      <>
      <Outlet />
      </>
  );
}