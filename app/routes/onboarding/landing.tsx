import { useLocation, useNavigate } from "react-router";
import LandingStep from "~/features/onboarding/intro/LandingStep";
import { getNextStepPath } from "~/features/onboarding/stepsConfig";

export default function OnboardingLandingRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  //Will eventually point to the next step when implemented
  const nextPath = getNextStepPath(location.pathname) ?? "/onboarding/TBD";

  return <LandingStep onNext={() => navigate(nextPath)} />;
}