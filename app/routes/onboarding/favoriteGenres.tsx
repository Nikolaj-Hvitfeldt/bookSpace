import { useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/favoriteGenres";
import FavoriteGenresStep from "~/components/onboarding/setup/FavoriteGenresStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";
import { getGenres } from "~/db/queries/genres.server";

export async function loader(_args: Route.LoaderArgs) {
  const genres = await getGenres();
  return { genres };
}

export default function FavoriteGenresRoute({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath = getNextStepPath(location.pathname) ?? "/favorite-authors";

  return (
    <FavoriteGenresStep
      onNext={() => navigate(nextPath)}
      genres={loaderData.genres}
    />
  );
}
