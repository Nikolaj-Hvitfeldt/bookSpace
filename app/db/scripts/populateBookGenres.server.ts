import connectDb from "../db.server";
import Book from "../models/Book";
import Genre from "../models/Genre";
import booksWithGenres from "../seedingData/books-with-genres.json";

type BookWithGenres = {
  slug: string;
  genres: string[];
};

export default async function populateBookGenres() {
  await connectDb();

  const genres = await Genre.find().lean();
  const nameToId = new Map(genres.map((genre) => [genre.name, genre._id]));

  const books = booksWithGenres as BookWithGenres[];

  try {
    for (const book of books) {
      const seen = new Set<string>(); // Makes an unique Set so we don't add the same genre twice
      const genreIds = (book.genres ?? [])
        .map((name) => nameToId.get(name))
        .filter((id): id is NonNullable<typeof id> => {
          // Filters out any null values by returning either true or false per each id
          if (id == null) return false;
          const key = id.toString(); // Converts the ObjectId to a string
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

      await Book.updateOne({ slug: book.slug }, { $set: { genres: genreIds } });
    }

    console.log("Populated book with genres successfully");
  } catch (error) {
    console.error("Error populating book with genres:", error);
    throw error;
  }
}
