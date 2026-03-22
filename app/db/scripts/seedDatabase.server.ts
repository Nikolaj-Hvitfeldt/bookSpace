import Book from "../models/Book";
import User from "../models/User";
import books from "../seedingData/books.json";
import users from "../seedingData/users.json";
import Genre from "../models/Genre";
import genres from "../seedingData/genres.json";
import authors from "../seedingData/authors.json";
import populateBookGenres from "./populateBookGenres.server";
import Author from "../models/author";
import populateBookAuthors from "./populateBookAuthors.server";

export default async function seedDatabase() {
  try {
    await seedGenres();
    await seedAuthors();
    await seedBooks();
    await seedUsers();
    await populateBookGenres();
    await populateBookAuthors();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

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
