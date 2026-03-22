import { useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/favoriteAuthors";
import FavoriteAuthorsStep from "~/components/onboarding/setup/FavoriteAuthorsStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";
import { getAuthors } from "~/db/queries/authors";

export async function loader(_args: Route.LoaderArgs) {
  const authors = await getAuthors();
  return { authors };
}

export default function FavoriteAuthorsRoute({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath =
    getNextStepPath(location.pathname) ?? "/onboarding/reading-goals";

  return (
    <FavoriteAuthorsStep
      onNext={() => navigate(nextPath)}
      authors={loaderData.authors}
    />
  );
}
