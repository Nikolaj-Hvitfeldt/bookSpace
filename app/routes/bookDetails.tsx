import type { Route } from "./+types/bookDetails";
import { bookmarkAction } from "~/actions/bookmark.server";
import { getUser } from "~/services/auth.server";
import { getBookDetailbyId } from "~/db/queries/books.server";
import BookDetailsPage from "~/components/books/BookDetailsPage";
import { getFavoriteBooks } from "~/db/queries/favorites.server";

export async function action({ request }: Route.ActionArgs) {
  return bookmarkAction(request);
}
export async function loader({ request, params }: Route.LoaderArgs) {
  const bookId = params.bookId;

  // Check if bookId is provided
  if (!bookId) {
    throw (new Error("Book not found"), { status: 404 });
  }

  const book = await getBookDetailbyId(bookId);

  // Check if book exists
  if (!book) {
    throw (new Error("Book not found"), { status: 404 });
  }

  const user = await getUser(request);
  const favorittedBooks = await getFavoriteBooks(user?._id.toString() ?? "");

  return { book: { ...book, isBookmarked: favorittedBooks.has(bookId) } };
}

export default function BookDetails({ loaderData }: Route.ComponentProps) {
  const book = loaderData?.book;
  return <BookDetailsPage book={book} backPath="/" />;
}
