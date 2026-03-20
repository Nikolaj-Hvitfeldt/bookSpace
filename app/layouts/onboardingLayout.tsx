import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/onboardingLayout";
import User from "../db/models/User";
import { requireUser } from "~/services/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
    const user = await requireUser(request);
  
    const currentUser = await User.findById(user._id);
    if (!currentUser) {
      return redirect("/login");
    }
  
    if (currentUser.onboardingComplete) {
      return redirect("/");
    }
  }
  
  export default function OnboardingLayout() {
    return <Outlet />;
  }
  