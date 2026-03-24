import connectDb from "../db.server";
import Book from "../models/Book";
import type { BookCardItem } from "../../components/home/BookCard";
import User from "../models/User";

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

export async function getShortBooks(limit = 25): Promise<BookCardItem[]> {
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

export async function getLongBooks(limit = 25): Promise<BookCardItem[]> {
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

export async function getRecommendedBooks(
  limit = 25,
  userId: string,
): Promise<BookCardItem[]> {
  await connectDb();

  //Get users preferences
  const user = await User.findById(userId)
    .select({ favoriteBooks: 1, favoriteGenres: 1, favoriteAuthors: 1 })
    .lean();

  console.log(user);

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
