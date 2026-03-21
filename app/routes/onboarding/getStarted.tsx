import { useLocation, useNavigate } from "react-router";
import GetStartedStep from "~/features/onboarding/intro/GetStartedStep";
import { getNextStepPath } from "~/features/onboarding/stepsConfig";

export default function GetStartedRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath = getNextStepPath(location.pathname) ?? "/login";

  return <GetStartedStep onNext={() => navigate(nextPath)} />;
}
