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
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          Address Book
        </Link>
        <nav className="main-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/login" end>
            Login
          </NavLink>
          <NavLink to="/signup" end>
            Sign up
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}
