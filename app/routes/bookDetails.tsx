import type { Route } from "./+types/bookDetails";
import { bookmarkAction } from "~/actions/bookmark.server";
import { getUser } from "~/services/auth.server";
import { getBookDetailsBySlug } from "~/db/queries/books.server";
import BookDetailsPage from "~/components/books/BookDetailsPage";
import { getFavoriteBooks } from "~/db/queries/favorites.server";
import Author from "~/db/models/Author";
import Book from "~/db/models/Book";
import type { BookDetail } from "~/types/bookDetail";
import type { BookCardItem } from "~/components/books/BookCard";
import Genre from "~/db/models/Genre";
import { getReviewsByBookId } from "~/db/queries/reviews.server";
import { createReviewAction } from "~/actions/createReview.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("submitFor");
  if (intent === "create-review") {
    return createReviewAction(request, formData);
  }
  return bookmarkAction(request, formData);
}
export async function loader({ request, params }: Route.LoaderArgs) {
  const bookSlug = params.bookSlug;

  // Check if bookSlug is provided
  if (!bookSlug) {
    throw new Response("Book Not Found", { status: 404 });
  }

  //Get book details
  const book = await getBookDetailsBySlug(bookSlug);

  // Check if book exists
  if (!book) {
    throw new Response("Book Not Found", { status: 404 });
  }

  //Get reviews for book
  const reviews = await getReviewsByBookId(book.id?.toString() ?? "");

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
        _id: { $ne: book.id },
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
          _id: { $ne: book.id },
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
    book: { ...book, isBookmarked: favorittedBooks.has(book.id) },
    authorBooks,
    similarBooks,
    reviews,
  };
}
export default function BookDetails({ loaderData }: Route.ComponentProps) {
  const book = loaderData?.book;
  const authorBooks = loaderData?.authorBooks;
  const similarBooks = loaderData?.similarBooks;
  const reviews = loaderData?.reviews;
  return (
    <BookDetailsPage
      book={book as BookDetail}
      backPath="/"
      authorBooks={authorBooks as BookCardItem[]}
      similarBooks={similarBooks as BookCardItem[]}
      reviews={reviews}
    />
  );
}
