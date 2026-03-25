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
import Genre from "~/db/models/Genre";

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

  let authorBooks: BookCardItem[] = [];
  let similarBooks: BookCardItem[] = [];

  const primaryGenre = book.genres?.[0];
  const authorSlug = book.authorSlugs?.[0];

  //Get author books
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

    //Get similar books by genre
    if (primaryGenre) {
      const genre = await Genre.findOne({ name: primaryGenre })
        .select({ _id: 1 })
        .lean();

      if (genre?._id) {
        const books = await Book.find({
          genres: genre?._id,
          _id: { $ne: bookId },
        })
          .select({ _id: 1, title: 1, coverImage: 1 })
          .limit(25)
          .lean();

        similarBooks = books.map((book) => ({
          id: book._id.toString(),
          title: book.title,
          coverImage: book.coverImage?.url ?? "",
        }));
      }
    }
  }

  return {
    book: { ...book, isBookmarked: favorittedBooks.has(bookId) },
    authorBooks,
    similarBooks,
  };
}
export default function BookDetails({ loaderData }: Route.ComponentProps) {
  const book = loaderData?.book;
  const authorBooks = loaderData?.authorBooks;
  const similarBooks = loaderData?.similarBooks;
  return (
    <BookDetailsPage
      book={book as BookDetail}
      backPath="/"
      authorBooks={authorBooks as BookCardItem[]}
      similarBooks={similarBooks as BookCardItem[]}
    />
  );
}
