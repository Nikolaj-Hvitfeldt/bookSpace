import connectDb from "../db.server";
import Book from "../models/Book";
import Author from "../models/Author";
import Genre from "../models/Genre";
import booksWithRelations from "../seedingData/books-with-relations.json";
import { Types } from "mongoose";

type BookRow = {
  slug: string;
  genres: string[];
  author: string[];
};

function extractIds(
  names: string[] | undefined,
  namesToIdMap: Map<string, Types.ObjectId>,
): Types.ObjectId[] {
  const seen = new Set<string>(); // Makes an unique Set so we don't add the same genre twice

  return (names ?? [])
    .map((name: string) => namesToIdMap.get(name))
    .filter((id): id is NonNullable<typeof id> => {
      // Filters out any null values by returning either true or false per each id
      if (id == null) return false;
      const key = id.toString(); // Converts the ObjectId to a string
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export default async function populateBookRelations() {
  await connectDb();

  const [genres, authors] = await Promise.all([
    Genre.find().lean(),
    Author.find().lean(),
  ]);

  const genreMapToId = new Map(genres.map((genre) => [genre.name, genre._id]));

  const authorMapToId = new Map(
    authors.map((author) => [author.name, author._id]),
  );

  const books = booksWithRelations as BookRow[];

  try {
    for (const book of books) {
      await Book.updateOne(
        { slug: book.slug },
        {
          $set: {
            genres: extractIds(book.genres, genreMapToId),
            author: extractIds(book.author, authorMapToId),
          },
        },
      );
    }
    console.log("Populated book with relations successfully");
  } catch (error) {
    console.error("Error populating book with relations:", error);
  }
}
