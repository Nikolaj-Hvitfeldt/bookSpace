import { Outlet, useLocation, useNavigate, Link } from "react-router";
import type { Route } from "./+types/onboardingLayout";
import {
  getPreviousStepPath,
  onboardingSteps,
} from "~/features/onboarding/stepsConfig";

//export async function loader({ request }: Route.LoaderArgs) {
// const user = await requireUser(request);

// const currentUser = await User.findById(user._id);
// if (!currentUser) {
//   return redirect("/login");
// }

// if (currentUser.onboardingComplete) {
//   return redirect("/");
// }
//}

export default function OnboardingLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentStep = onboardingSteps.find(
    (step) => step.path === location.pathname,
  );
  const showHeader = currentStep?.showHeader ?? true;

  const previousStepPath = getPreviousStepPath(location.pathname);
  const skipPath = "/login";

  return (
    <main className="min-h-dvh bg-secondary-eggshell">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col px-[clamp(16px,4vw,24px)] pt-[clamp(32px,8vh,64px)] pb-12">
        {showHeader ? (
          <header className="mb-[clamp(16px,3vh,32px)] flex w-full items-center justify-between">
            <button
              type="button"
              className="h-[25px] w-[25px]"
              onClick={() =>
                previousStepPath ? navigate(previousStepPath) : navigate(-1)
              }
            >
              <img src="/onboardingImages/back-button.avif" alt="Go back" />
            </button>

            <Link to={skipPath}>Skip</Link>
          </header>
        ) : (
          <div className="mb-[clamp(16px,3vh,32px)] h-[25px] w-[25px]" />
        )}

        <Outlet />
      </div>
    </main>
  );
}
