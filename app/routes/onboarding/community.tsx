import { useLocation, useNavigate } from "react-router";
import CommunityStep from "~/components/onboarding/intro/CommunityStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";

export default function CommunityRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath = getNextStepPath(location.pathname) ?? "/onboarding/tracking";

  return <CommunityStep onNext={() => navigate(nextPath)} />;
}
