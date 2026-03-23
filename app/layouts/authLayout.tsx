import { Outlet, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/authLayout";
import { getUserData } from "~/services/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserData(request);

  if (!user) {
    return null;
  }

  if (user.onboardingComplete) {
    return redirect("/");
  }

  return null;
}

export default function AuthLayout() {
  const navigate = useNavigate();

  return (
    <main className="bg-secondary-eggshell">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col px-[clamp(16px,4vw,24px)] pt-[clamp(32px,8vh,64px)] pb-[clamp(10px,2vh,20px)]">
        <header className="mb-[clamp(16px,4vh,32px)] flex w-full items-center justify-between">
          <button
            type="button"
            className="h-[25px] w-[25px]"
            onClick={() => navigate(-1)}
          >
            <img src="/onboardingImages/back-button.avif" alt="Go back" />
          </button>
        </header>
        <Outlet />
      </div>
    </main>
  );
}
