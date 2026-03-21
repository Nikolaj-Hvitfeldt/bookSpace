import { useLocation, useNavigate } from "react-router";
import TrackingStep from "~/features/onboarding/intro/TrackingStep";
import { getNextStepPath } from "~/features/onboarding/stepsConfig";

export default function TrackingRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  //Will eventually point to the next step when implemented
  const nextPath = getNextStepPath(location.pathname) ?? "/";

  return <TrackingStep onNext={() => navigate(nextPath)} />;
}
