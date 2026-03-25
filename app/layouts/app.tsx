import { Link, NavLink, Outlet, redirect } from "react-router";
import type { Route } from "./+types/app";
import { getUserData } from "~/services/auth.server";
import Navbar from "~/components/ui/navbar";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserData(request);

  if (!user) {
    return redirect("/onboarding/landing");
  }

  if (user && !user.onboardingComplete) {
    return redirect("/onboarding/favorite-books");
  }

  return null;
}
export default function AppLayout() {
  return (
    <main className=" bg-secondary-eggshell">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col px-[clamp(16px,4vw,24px)] pt-[clamp(32px,8vh,64px)] pb-24">
        <Outlet />
        <Navbar />
      </div>
    </main>
  );
}
