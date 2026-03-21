import { useLocation, useNavigate } from "react-router";
import LandingStep from "~/features/onboarding/intro/LandingStep";
import { getNextStepPath } from "~/features/onboarding/stepsConfig";

export default function LandingRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath = getNextStepPath(location.pathname) ?? "/onboarding/recommendation";

  return <LandingStep onNext={() => navigate(nextPath)} />;
}