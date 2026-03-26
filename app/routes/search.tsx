import SearchPage from "~/components/search/SearchPage";
import { getGenresWithPreviewCovers } from "~/db/queries/genres.server";
import type { Route } from "./+types/search";
import { searchBooksByTitleOrAuthor } from "~/db/queries/books.server";

export async function loader({}: Route.LoaderArgs) {
  const genres = await getGenresWithPreviewCovers();
  const books = await searchBooksByTitleOrAuthor();
  return { genres, books };
}

export default function Search({ loaderData }: Route.ComponentProps) {
  return (
    <SearchPage
      genres={loaderData?.genres ?? []}
      books={loaderData?.books ?? []}
    />
  );
}
