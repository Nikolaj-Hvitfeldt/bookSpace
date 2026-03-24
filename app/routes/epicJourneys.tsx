import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { getLongBooksList } from "~/db/queries/books.server";
import type { Route } from "./+types/popular";

export async function loader() {
  const books = await getLongBooksList();

  return { books };
}

export default function EpicJourneys({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  return <BookListPage title="Epic Journeys" books={books} backPath="/" />;
}
