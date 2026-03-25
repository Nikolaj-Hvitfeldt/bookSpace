import connectDb from "../db.server";
import Book from "../models/Book";
import type { BookCardItem } from "../../components/home/BookCard";
import User from "../models/User";
import ReadingProgress from "../models/ReadingProgress";
import type { BookList, BookDetail } from "~/types/bookList";
import { mapAuthorNames } from "~/util/authorNames.server";
import { pageProgressFromReading } from "~/util/pageProgress.server";

export type BookCovers = {
  id: string;
  coverUrl: string;
};

const defaultLimit = 6;

export async function getBookCovers(
  limit = defaultLimit,
): Promise<BookCovers[]> {
  await connectDb();

  const books = await Book.find().select({ coverImage: 1 }).limit(limit).lean();

  return books.map((book) => ({
    id: book._id.toString(),
    coverUrl: book.coverImage?.url || "",
  }));
}

export async function getPopularBooks(limit = 25): Promise<BookCardItem[]> {
  await connectDb();

  const books = await Book.find()

    //Fetches books based on highest rating cound. I admit this is a bit flawed,
    // as the most rated could in theory be very low rated and thus not very popular.
    // Its a matter of semantics in the end. What is actually popular? Lots of views or good reception?
    .sort({ ratingsCount: -1 })
    .limit(limit)
    .select({ _id: 1, title: 1, coverImage: 1 })
    .lean();
  return books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    coverImage: book.coverImage?.url || "",
  }));
}

export async function getPopularBooksList(limit = 25): Promise<BookList[]> {
  await connectDb();

  const books = await Book.find()
    .sort({ ratingsCount: -1 })
    .limit(limit)
    .select({ _id: 1, title: 1, coverImage: 1, author: 1, rating: 1 })
    .populate({
      path: "author",
      select: { name: 1 },
    })
    .lean();
  return books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    authors: mapAuthorNames(book.author as { name?: string }[]),
    coverImage: book.coverImage?.url || "",
    rating: book.rating ?? 0,
  }));
}

export async function getShortBooks(limit = 25): Promise<BookCardItem[]> {
  await connectDb();

  const books = await Book.find()
    .sort({ pageCount: 1 })
    .limit(limit)
    .select({ _id: 1, title: 1, coverImage: 1 })
    .lean();
  return books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    coverImage: book.coverImage?.url || "",
  }));
}

export async function getShortBooksList(limit = 25): Promise<BookList[]> {
  await connectDb();
  const books = await Book.find()
    .sort({ pageCount: 1 })
    .limit(limit)
    .select({ _id: 1, title: 1, coverImage: 1, author: 1, rating: 1 })
    .populate({
      path: "author",
      select: { name: 1 },
    })
    .lean();
  return books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    authors: mapAuthorNames(book.author as { name?: string }[]),
    coverImage: book.coverImage?.url || "",
    rating: book.rating ?? 0,
  }));
}
export async function getLongBooks(limit = 25): Promise<BookCardItem[]> {
  await connectDb();

  const books = await Book.find()
    .sort({ pageCount: -1 })
    .limit(limit)
    .select({ _id: 1, title: 1, coverImage: 1 })
    .lean();
  return books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    coverImage: book.coverImage?.url || "",
  }));
}

export async function getLongBooksList(limit = 25): Promise<BookList[]> {
  await connectDb();
  const books = await Book.find()
    .sort({ pageCount: -1 })
    .limit(limit)
    .select({ _id: 1, title: 1, coverImage: 1, author: 1, rating: 1 })
    .populate({
      path: "author",
      select: { name: 1 },
    })
    .lean();
  return books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    authors: mapAuthorNames(book.author as { name?: string }[]),
    coverImage: book.coverImage?.url || "",
    rating: book.rating ?? 0,
  }));
}
export async function getRecommendedBooks(
  limit = 25,
  userId: string,
): Promise<BookCardItem[]> {
  await connectDb();

  //Get users preferences
  const user = await User.findById(userId)
    .select({ favoriteBooks: 1, favoriteGenres: 1, favoriteAuthors: 1 })
    .lean();

  //Fallback to popular books if user is not found
  if (!user) {
    return getPopularBooks(limit);
  }

  //Fallback to popular books if user has no favorite authors or genres
  if (user.favoriteGenres.length === 0 && user.favoriteAuthors.length === 0) {
    return getPopularBooks(limit);
  }

  //Map genres and authors to strings
  const favoriteGenres = user.favoriteGenres.map((genre) => genre.toString());
  const favoriteAuthors = user.favoriteAuthors.map((author) =>
    author.toString(),
  );

  const recommendedBooks = await Book.find({
    //Exclude books that the user has already marked as favorite
    _id: { $nin: user.favoriteBooks },

    //Fetch books based on genres or authors
    $or: [
      { genres: { $in: favoriteGenres } },
      { author: { $in: favoriteAuthors } },
    ],
  })
    .sort({ rating: -1 })
    .limit(limit)
    .select({ _id: 1, title: 1, coverImage: 1 })
    .lean();

  return recommendedBooks.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    coverImage: book.coverImage?.url || "",
  }));
}

export async function getRecommendedBooksList(limit = 25): Promise<BookList[]> {
  await connectDb();
  const books = await Book.find()
    .sort({ rating: -1 })
    .limit(limit)
    .select({ _id: 1, title: 1, coverImage: 1, author: 1, rating: 1 })
    .populate({
      path: "author",
      select: { name: 1 },
    })
    .lean();
  return books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    authors: mapAuthorNames(book.author as { name?: string }[]),
    coverImage: book.coverImage?.url || "",
    rating: book.rating ?? 0,
  }));
}

export type CurrentlyReadingBook = BookCardItem & {
  currentPage: number;
  pageCount: number;
  progressPercentage: number;
};
export async function getCurrentlyReadingBooks(
  userId: string,
  limit = 25,
): Promise<CurrentlyReadingBook[]> {
  await connectDb();

  if (!userId) return [];

  //Fetch currently reading books
  //Sort by last updated
  //populate to replace book with the book data
  const books = await ReadingProgress.find({
    user: userId,
    status: "currently-reading",
  })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .populate({
      path: "book",
      select: { _id: 1, title: 1, coverImage: 1, pageCount: 1 },
    })
    .lean();

  return books.map((progress) => {
    //Typescript shananigans
    const book = progress.book as unknown as {
      _id: string;
      title: string;
      coverImage: {
        url: string;
      };
      pageCount: number;
    };

    const { currentPage, pageCount, progressPercentage } =
      pageProgressFromReading(progress.currentPage, book.pageCount);

    return {
      id: book._id.toString(),
      title: book.title,
      coverImage: book.coverImage?.url || "",
      currentPage,
      pageCount,
      progressPercentage,
    };
  });
}

export async function getCurrentlyReadingBooksList(
  userId: string,
  limit = 25,
): Promise<BookList[]> {
  await connectDb();
  if (!userId) return [];

  const books = await ReadingProgress.find({
    user: userId,
    status: "currently-reading",
  })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .populate({
      path: "book",
      select: {
        _id: 1,
        title: 1,
        coverImage: 1,
        author: 1,
        rating: 1,
        pageCount: 1,
      },
    })
    //Author does not exist in ReadingProgress, so we need to populate it from the Book model
    .populate({
      path: "book",
      select: {
        _id: 1,
        title: 1,
        coverImage: 1,
        author: 1,
        rating: 1,
        pageCount: 1,
      },
      populate: {
        path: "author",
        select: { name: 1 },
      },
    })
    .lean();

  //use flatMap instead of map to skip empty book populates
  return books.flatMap((progress) => {
    const populatedBook = progress.book;
    if (!populatedBook || typeof populatedBook !== "object") return [];

    const book = populatedBook as unknown as {
      _id: string;
      title: string;
      coverImage: {
        url: string;
      };
      author: {
        name?: string;
      }[];
      rating: number;
      pageCount: number;
    };

    const { currentPage, pageCount, progressPercentage } =
      pageProgressFromReading(progress.currentPage, book.pageCount);

    return {
      id: book._id.toString(),
      title: book.title,
      authors: mapAuthorNames(book.author as { name?: string }[]),
      coverImage: book.coverImage?.url || "",
      rating: book.rating ?? 0,
      progressPercentage,
      currentPage,
      pageCount,
    };
  });
}

export async function getBookDetailbyId(
  bookId: string,
): Promise<BookDetail | null> {
  await connectDb();

  const book = await Book.findById(bookId)
    .select({
      _id: 1,
      title: 1,
      coverImage: 1,
      author: 1,
      rating: 1,
      pageCount: 1,
      description: 1,
      genres: 1,
    })
    .populate({
      path: "author",
      select: { name: 1 },
    })
    .lean();

  if (!book) return null;

  const genres = book.genres.map((genre) => genre.toString());
  const authors = mapAuthorNames(book.author as { name?: string }[]);

  return {
    id: book._id.toString(),
    title: book.title,
    authors,
    coverImage: book.coverImage?.url || "",
    rating: book.rating ?? 0,
    pageCount: book.pageCount ?? 0,
    description: book.description ?? "",
    genres,
  };
}
