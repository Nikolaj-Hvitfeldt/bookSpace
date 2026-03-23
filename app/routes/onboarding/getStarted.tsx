import { useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/getStarted";
import GetStartedStep from "~/components/onboarding/intro/GetStartedStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";
import { getBookCovers } from "~/db/queries/books";

export async function loader(_args: Route.LoaderArgs) {
  const books = await getBookCovers();
  return { books };
}

export default function GetStartedRoute({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath = getNextStepPath(location.pathname) ?? "/login";

  return (
    <GetStartedStep
      onNext={() => navigate(nextPath)}
      books={loaderData.books}
    />
  );
}
