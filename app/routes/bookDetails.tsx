import type { Route } from "./+types/bookDetails";
import { bookmarkAction } from "~/actions/bookmark.server";
import { getUser } from "~/services/auth.server";
import { getBookDetailbyId } from "~/db/queries/books.server";
import BookDetailsPage from "~/components/books/BookDetailsPage";
import { getFavoriteBooks } from "~/db/queries/favorites.server";
import Author from "~/db/models/Author";
import Book from "~/db/models/Book";
import type { BookDetail } from "~/types/bookList";
import type { BookCardItem } from "~/components/home/BookCard";

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

  const authorSlug = book.authorSlugs?.[0];
  let authorBooks: BookCardItem[] = [];

  if (authorSlug) {
    const author = await Author.findOne({ slug: authorSlug })
      .select("_id")
      .lean();

    if (author?._id) {
      const books = await Book.find({
        author: author?._id,
        _id: { $ne: bookId },
      })
        .select({ _id: 1, title: 1, coverImage: 1 })
        .lean();

      authorBooks = books.map((book) => ({
        id: book._id.toString(),
        title: book.title,
        coverImage: book.coverImage?.url ?? "",
      }));
    }

    return {
      book: { ...book, isBookmarked: favorittedBooks.has(bookId) },
      authorBooks,
    };
  }
}
export default function BookDetails({ loaderData }: Route.ComponentProps) {
  const book = loaderData?.book;
  const authorBooks = loaderData?.authorBooks;

  return (
    <BookDetailsPage
      book={book as BookDetail}
      backPath="/"
      authorBooks={authorBooks as BookCardItem[]}
    />
  );
}
