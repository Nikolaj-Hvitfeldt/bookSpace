import connectDb from "../db.server";
import Book from "../models/Book";
import type { BookCardItem } from "../../components/home/BookCard";

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
