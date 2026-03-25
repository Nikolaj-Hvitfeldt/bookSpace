import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { getRecommendedBooksList } from "~/db/queries/books.server";
import type { Route } from "./+types/popular";
import { bookmarkAction } from "~/actions/bookmark.server";
import { getUser } from "~/services/auth.server";
import { getFavoriteBooks } from "~/db/queries/favorites.server";
import { markBooksAsBookmarked } from "~/db/queries/favorites.server";

export async function action({ request }: Route.ActionArgs) {
  return bookmarkAction(request);
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  const favorittedBooks = await getFavoriteBooks(user?._id.toString() ?? "");
  const books = await getRecommendedBooksList();
  const booksWithFavoriteFlags = markBooksAsBookmarked(books, favorittedBooks);

  return { books: booksWithFavoriteFlags };
}

export default function Recommended({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  return <BookListPage title="Recommended" books={books} backPath="/" />;
}
