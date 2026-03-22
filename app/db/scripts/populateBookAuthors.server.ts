import connectDb from "../db.server";
import Book from "../models/Book";
import Author from "../models/author";
import booksWithAuthors from "../seedingData/books-with-genres-and-authors.json";

type BookWithAuthors = {
  slug: string;
  author: string[];
};

export default async function populateBookAuthors() {
  await connectDb();

  const authors = await Author.find().lean();
  const nameToId = new Map(authors.map((author) => [author.name, author._id]));

  const books = booksWithAuthors as BookWithAuthors[];

  try {
    for (const book of books) {
      const seen = new Set<string>(); // Makes an unique Set so we don't add the same genre twice
      const authorIds = (book.author ?? [])
        .map((name) => nameToId.get(name))
        .filter((id): id is NonNullable<typeof id> => {
          // Filters out any null values by returning either true or false per each id
          if (id == null) return false;
          const key = id.toString(); // Converts the ObjectId to a string
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

      await Book.updateOne(
        { slug: book.slug },
        { $set: { author: authorIds } },
      );
    }

    console.log("Populated book with authors successfully");
  } catch (error) {
    console.error("Error populating book with authors:", error);
    throw error;
  }
}
