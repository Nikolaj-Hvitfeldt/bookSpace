import connectDb from "../db.server";
import Book from "../models/Book";

export type BookCovers = {
  id: string;
  coverUrl: string;
};

export async function getBookCovers(): Promise<BookCovers[]> {
  await connectDb();

  const books = await Book.find().select({ coverImage: 1 }).lean();

  return books.map((book) => ({
    id: book._id.toString(),
    coverUrl: book.coverImage?.url || "",
  }));
}
