import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { getPopularBooksList } from "~/db/queries/books.server";
import type { Route } from "./+types/popular";
import { bookmarkAction } from "~/actions/bookmark.server";
import { getUser } from "~/services/auth.server";
import { getFavoriteBooks } from "~/db/queries/favorites.server";

export async function action({ request }: Route.ActionArgs) {
  return bookmarkAction(request);
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  const books = await getPopularBooksList();
  const favorittedBooks = await getFavoriteBooks(user?._id.toString() ?? "");

  return { books, favorittedBooks };
}

export default function Popular({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  return <BookListPage title="Popular" books={books} backPath="/" />;
}
