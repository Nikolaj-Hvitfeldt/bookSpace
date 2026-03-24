import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { getRecommendedBooksList } from "~/db/queries/books.server";
import type { Route } from "./+types/popular";

export async function loader() {
  const books = await getRecommendedBooksList();

  return { books };
}

export default function Popular({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  return <BookListPage title="Recommended" books={books} backPath="/" />;
}
