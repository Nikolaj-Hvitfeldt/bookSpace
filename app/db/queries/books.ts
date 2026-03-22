import connectDb from "../db.server";
import Book from "../models/Book";

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
