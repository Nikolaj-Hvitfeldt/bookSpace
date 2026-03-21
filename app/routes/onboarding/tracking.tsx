import { useLocation, useNavigate } from "react-router";
import TrackingStep from "~/features/onboarding/intro/TrackingStep";
import { getNextStepPath } from "~/features/onboarding/stepsConfig";

export default function TrackingRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath =
    getNextStepPath(location.pathname) ?? "/onboarding/get-started";

  return <TrackingStep onNext={() => navigate(nextPath)} />;
}
