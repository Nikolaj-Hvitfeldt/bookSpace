import { useLocation, useNavigate } from "react-router";
import RecommendationStep from "~/features/onboarding/intro/RecommendationStep";
import { getNextStepPath } from "~/features/onboarding/stepsConfig";

export default function RecommendationRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  //Will eventually point to the next step when implemented
  const nextPath = getNextStepPath(location.pathname) ?? "/onboarding/TBD";

  return <RecommendationStep onNext={() => navigate(nextPath)} />;
}