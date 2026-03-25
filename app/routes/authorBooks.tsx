import type { Route } from "./+types/authorBooks";
import BookListPage, { type BookList } from "~/components/books/BookListPage";
import { bookmarkAction } from "~/actions/bookmark.server";
import { getUser } from "~/services/auth.server";
import { getFavoriteBooks } from "~/db/queries/favorites.server";
import { markBooksAsBookmarked } from "~/db/queries/favorites.server";
import connectDb from "~/db/db.server";
import Author from "~/db/models/Author";
import Book from "~/db/models/Book";
import { mapAuthorNames } from "~/util/authorNames.server";

export async function action({ request }: Route.ActionArgs) {
  return bookmarkAction(request);
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const authorSlug = params.authorSlug;

  // Check if authorSlug is provided
  if (!authorSlug) throw new Response("Not Found", { status: 404 });

  await connectDb();

  const author = await Author.findOne({ slug: authorSlug })
    .select({ _id: 1, name: 1 })
    .lean();

  // Check if author exists
  if (!author) throw new Response("Not Found", { status: 404 });

  const user = await getUser(request);
  const favorittedBooks = await getFavoriteBooks(user?._id.toString() ?? "");

  // Get books by author
  const books = await Book.find({ author: author._id })
    .sort({ ratingsCount: -1 })
    .limit(25)
    .select({ _id: 1, title: 1, coverImage: 1, author: 1, rating: 1, slug: 1 })
    .populate({ path: "author", select: { name: 1 } })
    .lean();

  // Convert books to book list
  const bookList: BookList[] = books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    authors: mapAuthorNames(book.author as { name?: string }[]),
    coverImage: book.coverImage?.url || "",
    rating: book.rating ?? 0,
    bookSlug: book.slug ?? "",
  }));

  return {
    title: author.name,
    books: markBooksAsBookmarked(bookList, favorittedBooks),
  };
}
export default function AuthorBooks({ loaderData }: Route.ComponentProps) {
  const books = loaderData?.books ?? [];
  const title = loaderData?.title ?? "Author";
  return <BookListPage title={title} books={books} backPath="/" />;
}
