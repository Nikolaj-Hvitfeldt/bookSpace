import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { getCurrentlyReadingBooksList } from "~/db/queries/books.server";
import type { Route } from "./+types/currentlyReading";
import { getUser } from "~/services/auth.server";
import { getFavoriteBooks } from "~/db/queries/favorites.server";
import { markBooksAsBookmarked } from "~/db/queries/favorites.server";
import { bookmarkAction } from "~/actions/bookmark.server";

export async function action({ request }: Route.ActionArgs) {
  return bookmarkAction(request);
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  const favorittedBooks = await getFavoriteBooks(user?._id.toString() ?? "");

  const books = await getCurrentlyReadingBooksList(user?._id.toString() || "");
  const booksWithFavoriteFlags = markBooksAsBookmarked(books, favorittedBooks);
  return { books: booksWithFavoriteFlags };
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
