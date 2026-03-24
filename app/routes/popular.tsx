import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { getPopularBooksList } from "~/db/queries/books.server";
import type { Route } from "./+types/popular";

export async function loader() {
  const books = await getPopularBooksList();

  return { books };
}

export default function Popular({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  return <BookListPage title="Popular" books={books} backPath="/" />;
}
