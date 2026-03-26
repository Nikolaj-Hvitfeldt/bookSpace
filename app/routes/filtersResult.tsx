import { useActionData } from "react-router";
import type { Route } from "./+types/filtersResult";
import { searchFiltersAction } from "~/actions/searchFilters.server";
import type { BookList } from "~/components/books/BookListPage";
import BookListPage from "~/components/books/BookListPage";

export async function action({ request }: Route.ActionArgs) {
  return searchFiltersAction(request);
}

export default function FiltersResult({}: Route.ComponentProps) {
  const actionData = useActionData() as { books: BookList[] | undefined };
  const books = actionData?.books ?? [];

  // litterally no Character & Plot tags or moods exist in the database except "gay"
  // Will only fetch books on Mood & Emotions like "sad", but it works
  return books.length > 0 ? (
    <BookListPage books={books} title="Result" backPath="/search" />
  ) : (
    <div className="text-center text-[44px]">404: No books found</div>
  );
}
