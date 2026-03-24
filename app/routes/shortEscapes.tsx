import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { getShortBooksList } from "~/db/queries/books.server";
import type { Route } from "./+types/popular";

export async function loader() {
  const books = await getShortBooksList();

  return { books };
}

export default function ShortEscapes({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  return <BookListPage title="Short Escapes" books={books} backPath="/" />;
}
