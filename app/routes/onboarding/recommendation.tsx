import { useLocation, useNavigate } from "react-router";
import RecommendationStep from "~/components/onboarding/intro/RecommendationStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";

export default function RecommendationRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath =
    getNextStepPath(location.pathname) ?? "/onboarding/community";

  return <RecommendationStep onNext={() => navigate(nextPath)} />;
}
