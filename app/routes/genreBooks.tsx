import type { Route } from "./+types/genreBooks";
import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { bookmarkAction } from "~/actions/bookmark.server";
import { getUser } from "~/services/auth.server";
import { getFavoriteBooks } from "~/db/queries/favorites.server";
import { markBooksAsBookmarked } from "~/db/queries/favorites.server";
import connectDb from "~/db/db.server";
import Genre from "~/db/models/Genre";
import Book from "~/db/models/Book";
import { mapAuthorNames } from "~/util/authorNames.server";

export async function action({ request }: Route.ActionArgs) {
  return bookmarkAction(request);
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const genreSlug = params.genreSlug;

  // Check if genreSlug is provided
  if (!genreSlug) throw new Response("Not Found", { status: 404 });

  await connectDb();

  const genre = await Genre.findOne({ slug: genreSlug })
    .select({ _id: 1, name: 1 })
    .lean();

  // Check if genre exists
  if (!genre) throw new Response("Not Found", { status: 404 });

  const user = await getUser(request);
  const favorittedBooks = await getFavoriteBooks(user?._id.toString() ?? "");

  // Get books by genre
  const books = await Book.find({ genres: genre._id })
    .sort({ ratingsCount: -1 })
    .limit(25)
    .select({ _id: 1, title: 1, coverImage: 1, author: 1, rating: 1 })
    .populate({ path: "author", select: { name: 1 } })
    .lean();

  // Convert books to book list
  const bookList: BookList[] = books.map((b) => ({
    id: b._id.toString(),
    title: b.title,
    authors: mapAuthorNames(b.author as { name?: string }[]),
    coverImage: b.coverImage?.url || "",
    rating: b.rating ?? 0,
  }));

  return {
    title: genre.name ?? "Genre",
    books: markBooksAsBookmarked(bookList, favorittedBooks),
  };
}

export default function GenreBooks({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  const title = loaderData?.title ?? "Genre";
  return <BookListPage title={title} books={books} backPath="/" />;
}
