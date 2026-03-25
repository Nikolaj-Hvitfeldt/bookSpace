import Book from "../models/Book";
import User from "../models/User";
import books from "../seedingData/books.json";
import users from "../seedingData/users.json";
import Genre from "../models/Genre";
import genres from "../seedingData/genres.json";
import authors from "../seedingData/authors.json";
import Author from "../models/Author";
import populateBookRelations from "./populateBookRelations.server";
import reviews from "../seedingData/reviews.json";
import readingProgress from "../seedingData/reading-progress.json";
import Review from "../models/Review";
import ReadingProgress from "../models/ReadingProgress";

export default async function seedDatabase() {
  try {
    await seedGenres();
    await seedAuthors();
    await seedBooks();
    await seedUsers();
    await populateBookRelations();
    await seedReadingProgress();
    await seedReviews();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

type ReviewSeed = {
  bookSlug: string;
  userEmail: string;
  text: string;
  rating: number;
  helpfulCount?: number;
  notHelpfulCount?: number;
};

type ReadingProgressSeed = {
  userEmail: string;
  bookSlug: string;
  status: "currently-reading" | "completed" | "want-to-read";
  currentPage: number;
};

async function seedBooks() {
  const booksCount = await Book.countDocuments();
  if (booksCount > 0) {
    console.log("Books already seeded");
    return;
  }
  await Book.insertMany(books);
  console.log("Books seeded successfully");
}

async function seedUsers() {
  const usersCount = await User.countDocuments();
  if (usersCount > 0) {
    console.log("Users already seeded");
    return;
  }

  //To make sure hashing is working - call create here instead of insertMany. This goes through the mongoose schema with hashing and salting.
  await User.create(users);
  console.log("Users seeded successfully");
}

async function seedGenres() {
  const genresCount = await Genre.countDocuments();
  if (genresCount > 0) {
    console.log("Genres already seeded");
    return;
  }
  await Genre.insertMany(genres);
  console.log("Genres seeded successfully");
}

async function seedAuthors() {
  const authorsCount = await Author.countDocuments();
  if (authorsCount > 0) {
    console.log("Authors already seeded");
    return;
  }
  await Author.insertMany(authors);
  console.log("Authors seeded successfully");
}

async function seedReadingProgress() {
  const count = await ReadingProgress.countDocuments();
  if (count > 0) {
    console.log("Reading progress already seeded");
    return;
  }

  const [books, users] = await Promise.all([
    Book.find().select({ _id: 1, slug: 1, pageCount: 1 }).lean(),
    User.find().select({ _id: 1, email: 1 }).lean(),
  ]);

  const bookBySlug = new Map(books.map((book) => [book.slug, book]));
  const userIdByEmail = new Map(users.map((user) => [user.email, user._id]));

  const docs = (readingProgress as ReadingProgressSeed[])
    .map((row) => {
      const userId = userIdByEmail.get(row.userEmail);
      const book = bookBySlug.get(row.bookSlug);
      if (!userId || !book) return null;

      let currentPage = row.currentPage;
      if (row.status === "want-to-read") {
        currentPage = 0;
      } else if (typeof book.pageCount === "number" && book.pageCount > 0) {
        currentPage = Math.min(currentPage, book.pageCount);
      }

      return {
        user: userId,
        book: book._id,
        status: row.status,
        currentPage,
      };
    })
    .filter(
      (progressDoc): progressDoc is NonNullable<typeof progressDoc> =>
        progressDoc !== null,
    );

  if (docs.length === 0) {
    console.log("No reading progress rows to seed (missing users or books)");
    return;
  }

  await ReadingProgress.insertMany(docs);
  console.log("Reading progress seeded successfully");
}

async function seedReviews() {
  const count = await Review.countDocuments();
  if (count > 0) {
    console.log("Reviews already seeded");
    return;
  }
  const [books, users] = await Promise.all([
    Book.find().select({ _id: 1, slug: 1 }).lean(),
    User.find().select({ _id: 1, email: 1 }).lean(),
  ]);

  const bookIdBySlug = new Map(books.map((book) => [book.slug, book._id]));
  const userIdByEmail = new Map(users.map((user) => [user.email, user._id]));

  const docs = (reviews as ReviewSeed[])
    .map((review) => {
      const bookId = bookIdBySlug.get(review.bookSlug);
      const userId = userIdByEmail.get(review.userEmail);
      if (!bookId || !userId) return null;
      return {
        book: bookId,
        user: userId,
        text: review.text,
        rating: review.rating,
        helpfulCount: review.helpfulCount ?? 0,
        notHelpfulCount: review.notHelpfulCount ?? 0,
      };
    })
    .filter(
      (reviewDoc): reviewDoc is NonNullable<typeof reviewDoc> =>
        reviewDoc !== null,
    );
  await Review.insertMany(docs);
  console.log("Reviews seeded successfully");
}
