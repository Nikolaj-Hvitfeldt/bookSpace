import Book from "../models/Book";
import User from "../models/User";
import books from "../seedingData/books.json";
import users from "../seedingData/users.json";
import bcrypt from "bcryptjs";
export default async function seedDatabase() {
    try{
        await seedBooks();
        await seedUsers();
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