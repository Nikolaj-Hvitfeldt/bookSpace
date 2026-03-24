import {
  Outlet,
  useLocation,
  useNavigate,
  Link,
  useSubmit,
  redirect,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/onboardingLayout";
import {
  getPreviousStepPath,
  onboardingSteps,
  getNextStepPath,
} from "~/components/onboarding/stepsConfig";
import { Button } from "~/components/ui/button";
import { getUserData } from "~/services/auth.server";
import { useState, useEffect } from "react";

export type OnboardingContextType = {
  selectedExperience: string;
  setSelectedExperience: (experience: string) => void;
};

export async function loader({ request }: Route.LoaderArgs) {
  const pathname = new URL(request.url).pathname;
  const user = await getUserData(request);

  const publicOnboardingSteps = [
    "/onboarding/landing",
    "/onboarding/recommendation",
    "/onboarding/community",
    "/onboarding/tracking",
    "/onboarding/get-started",
  ];

  const privateOnboardingSteps = [
    "/onboarding/favorite-books",
    "/onboarding/favorite-genres",
    "/onboarding/favorite-authors",
    "/onboarding/reading-goals",
    "/onboarding/reading-experience",
  ];

  const isPublicPath = publicOnboardingSteps.includes(pathname);
  const isPrivatePath = privateOnboardingSteps.includes(pathname);

  //If user is not logged in redirect to onboarding start flow
  if (!user) {
    if (isPublicPath) {
      return null;
    }
    return redirect("/onboarding/landing");
  }

  //Onboarding is not complete redirect to setup steps
  if (user && !user.onboardingComplete && !isPrivatePath) {
    return redirect("/onboarding/favorite-books");
  }

  //Onboarding is complete redirect to home page
  if (user && user.onboardingComplete) {
    return redirect("/");
  }

  return null;
}

export default function OnboardingLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const [selectedExperience, setSelectedExperience] = useState("");

  useEffect(() => {
    if (location.pathname !== "/onboarding/reading-experience") {
      return;
    }
    const readingExperience = sessionStorage.getItem("reading-experience");

    if (readingExperience) {
      setSelectedExperience(readingExperience);
    }
  }, [location.pathname]);

  const currentStep = onboardingSteps.find(
    (step) => step.path === location.pathname,
  );

  const showHeader = currentStep?.showHeader ?? true;
  const progressBar = currentStep?.progressBar;
  const isGetStarted = currentStep?.id === "get-started";
  const isFinalStep = currentStep?.id === "reading-experience";
  const isLandingStep = currentStep?.id === "landing";

  const previousStepPath = getPreviousStepPath(location.pathname);
  const skipPath = "/login";
  const nextStepPath = getNextStepPath(location.pathname);

  const isSubmitting =
    navigation.state === "submitting" &&
    navigation.formAction === "/onboarding/reading-experience";

  const isDisabled = isFinalStep && (!selectedExperience || isSubmitting);

  function safeParseArray(value: string | null): unknown[] {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function handleSubmit() {
    const genreIds = safeParseArray(sessionStorage.getItem("favorite-genres"));
    const authorIds = safeParseArray(
      sessionStorage.getItem("favorite-authors"),
    );

    const formData = new FormData();
    formData.set("payload", JSON.stringify({ genreIds, authorIds }));

    submit(formData, {
      method: "post",
      action: "/onboarding/reading-experience",
    });
  }

  return (
    <main className="bg-secondary-eggshell">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col px-[clamp(16px,4vw,24px)] pt-[clamp(32px,8vh,64px)] pb-[clamp(10px,2vh,20px)]">
        {/* Headers*/}
        {isGetStarted || isLandingStep ? (
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
              <img src="/globalImages/more-arrow.svg" alt="Go back" />
            </button>

            <Link to={skipPath}>Skip</Link>
          </header>
        ) : (
          <div className="mb-[clamp(16px,4vh,32px)] h-[25px] w-[25px]" />
        )}

        <div className="mt-[clamp(24px,5vh,48px)]">
          <Outlet context={{ selectedExperience, setSelectedExperience }} />
        </div>

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
                onClick={() => navigate("/signup")}
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
                disabled={isDisabled}
                onClick={() => {
                  if (isFinalStep) {
                    handleSubmit();
                    return;
                  }
                  navigate(nextStepPath ?? "/login");
                }} // navigates to next step or falls back to login page
              >
                {isSubmitting
                  ? "Finalizing..."
                  : currentStep?.buttons[0]?.label}
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
