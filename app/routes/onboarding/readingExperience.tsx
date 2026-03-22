import { useLocation, useNavigate } from "react-router";
import ReadingExperienceStep from "~/components/onboarding/setup/ReadingExperienceStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";

export default function ReadingExperienceRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath = getNextStepPath(location.pathname) ?? "/";

  return <ReadingExperienceStep onNext={() => navigate(nextPath)} />;
}
