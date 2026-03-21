import connectDb from "../db.server";
import Book from "../models/Book";

export type BookCovers = {
  id: string;
  coverUrl: string;
};

export type Genre = {
  id: string;
  name: string;
};

const defaultBookLimit = 6;

export async function getBookCovers(
  limit = defaultBookLimit,
): Promise<BookCovers[]> {
  await connectDb();

  const books = await Book.find().select({ coverImage: 1 }).limit(limit).lean();

  return books.map((book) => ({
    id: book._id.toString(),
    coverUrl: book.coverImage?.url || "",
  }));
}

export async function getGenres() {
  await connectDb();
  const genres = await Genre.find().lean();
  return genres.map((genre) => ({
    id: genre._id.toString(),
    name: genre.name,
  }));
}
