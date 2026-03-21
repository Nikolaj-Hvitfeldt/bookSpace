import { Outlet, redirect, useLocation } from "react-router";
import type { Route } from "./+types/onboardingLayout";
import User from "../db/models/User";
import { requireUser, getUserData } from "~/services/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
   // const user = await requireUser(request);
  
   // const currentUser = await User.findById(user._id);
   // if (!currentUser) {
   //   return redirect("/login");
   // }
  
   // if (currentUser.onboardingComplete) {
   //   return redirect("/");
   // }

  // Temporary fix for requireUser not working. Revisit when implementing register/sign up
   const user = await getUserData(request);
   if (user) {
       return redirect("/onboarding/landing");
   }
}
  
    export default function OnboardingLayout() {
      return (
        <main className="min-h-dvh bg-secondary-eggshell">
          <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col px-[clamp(16px,4vw,24px)] pt-[clamp(84px,12vh,168px)] pb-12">
            <Outlet />
          </div>
        </main>
      );
    }
  