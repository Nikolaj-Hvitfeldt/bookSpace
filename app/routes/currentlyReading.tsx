import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { getCurrentlyReadingBooksList } from "~/db/queries/books.server";
import type { Route } from "./+types/currentlyReading";
import { getUserData } from "~/services/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserData(request);

  const books = await getCurrentlyReadingBooksList(user?._id.toString() || "");
  return { books };
}
export default function CurrentlyReading({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  return (
    <BookListPage
      title="Currently Reading"
      books={books}
      backPath="/"
      showCurrentPage={true}
    />
  );
}
