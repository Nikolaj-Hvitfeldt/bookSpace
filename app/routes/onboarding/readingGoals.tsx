import { useLocation, useNavigate } from "react-router";
import ReadingGoalsStep from "~/components/onboarding/setup/ReadingGoalsStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";

export default function ReadingGoalsRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath =
    getNextStepPath(location.pathname) ?? "/onboarding/reading-experience";

  return <ReadingGoalsStep onNext={() => navigate(nextPath)} />;
}
