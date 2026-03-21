import { useLocation, useNavigate } from "react-router";
import CommunityStep from "~/features/onboarding/intro/CommunityStep";
import { getNextStepPath } from "~/features/onboarding/stepsConfig";

export default function CommunityRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  //Will eventually point to the next step when implemented
  const nextPath = getNextStepPath(location.pathname) ?? "/";

  return <CommunityStep onNext={() => navigate(nextPath)} />;
}
