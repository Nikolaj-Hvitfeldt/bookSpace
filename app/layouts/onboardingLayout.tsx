import { Outlet, useLocation, useNavigate, Link } from "react-router";
import type { Route } from "./+types/onboardingLayout";
import {
  getPreviousStepPath,
  onboardingSteps,
  getNextStepPath,
} from "~/components/onboarding/stepsConfig";
import { Button } from "~/components/ui/button";

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
  const progressBar = currentStep?.progressBar;
  const isGetStarted = currentStep?.id === "get-started";

  const previousStepPath = getPreviousStepPath(location.pathname);
  const skipPath = "/login";
  const nextStepPath = getNextStepPath(location.pathname);

  return (
    <main className="bg-secondary-eggshell">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col px-[clamp(16px,4vw,24px)] pt-[clamp(32px,8vh,64px)] pb-[clamp(10px,2vh,20px)]">
        {/* Headers*/}
        {isGetStarted ? (
          <header className="mb-[clamp(16px,4vh,32px)] flex w-full items-center justify-between">
            <div className="mb-[clamp(16px,4vh,32px)] h-[25px] w-[25px]" />
            <Button
              size="small"
              type="button"
              variant="secondary"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          </header>
        ) : showHeader ? (
          <header className="mb-[clamp(16px,4vh,32px)] flex w-full items-center justify-between">
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
          <div className="mb-[clamp(16px,4vh,32px)] h-[25px] w-[25px]" />
        )}

        <Outlet />

        <div className="mt-auto flex w-full flex-col gap-4">
          {/* Progress Bar */}
          {progressBar ? (
            <div
              className="flex w-full gap-3"
              role="progressbar"
              aria-label="Onboarding progress"
              //Accessibility for screen readers
              aria-valuemin={1}
              aria-valuemax={progressBar.total}
              aria-valuenow={progressBar.current}
            >
              {Array.from({ length: progressBar.total }, (_, index) => {
                const filled = index === progressBar.current - 1; //Arrays are index based hence we need to subtract 1
                return (
                  <div
                    key={index}
                    className={[
                      "h-[4px] flex-1 rounded-full",
                      filled ? "bg-primary-brown" : "bg-secondary-gainsboro",
                    ].join(" ")} // Needs to join to pass as a string isntead of an array - className wants a string
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          ) : (
            <div className="mb-4 flex w-full gap-3" />
          )}

          {/* Buttons */}
          {isGetStarted && currentStep && currentStep.buttons.length >= 2 ? (
            <div className="flex flex-col w-full gap-3 ">
              <Button
                type="button"
                className="w-full"
                variant={currentStep.buttons[0].variant}
                onClick={() => navigate("/login")} // Change to register / sign up when implemented
              >
                {currentStep?.buttons[0]?.label}
              </Button>
              <Button
                type="button"
                className="w-full"
                variant={currentStep.buttons[1].variant}
                onClick={() => navigate("/")} // navigates to index / home page
              >
                {currentStep?.buttons[1]?.label}
              </Button>
            </div>
          ) : currentStep?.buttons ? (
            <div className="flex w-full justify-center">
              <Button
                type="button"
                className="w-full"
                variant={currentStep?.buttons[0]?.variant}
                onClick={() => navigate(nextStepPath ?? "/login")} // navigates to next step or falls back to login page
              >
                {currentStep?.buttons[0]?.label}
              </Button>
            </div>
          ) : (
            <div className="mt-auto flex w-full flex-col gap-4" />
          )}
        </div>
      </div>
    </main>
  );
}
