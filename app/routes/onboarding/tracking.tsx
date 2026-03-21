import { useLocation, useNavigate } from "react-router";
import TrackingStep from "~/components/onboarding/intro/TrackingStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";

export default function TrackingRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath =
    getNextStepPath(location.pathname) ?? "/onboarding/get-started";

  return <TrackingStep onNext={() => navigate(nextPath)} />;
}
