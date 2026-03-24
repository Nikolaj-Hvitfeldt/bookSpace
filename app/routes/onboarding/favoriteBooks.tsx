import { useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/favoriteBooks";
import FavoriteBooksStep from "~/components/onboarding/setup/FavoriteBooksStep";
import { getNextStepPath } from "~/components/onboarding/stepsConfig";
import { getBookCovers } from "~/db/queries/books.server";

export async function loader(_args: Route.LoaderArgs) {
  const books = await getBookCovers(9);
  return { books };
}

export default function FavoriteBooksRoute({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const nextPath = getNextStepPath(location.pathname) ?? "/favorite-genres";

  return (
    <FavoriteBooksStep
      onNext={() => navigate(nextPath)}
      books={loaderData.books}
    />
  );
}
