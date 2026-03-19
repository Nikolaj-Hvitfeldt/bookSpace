import Book from "../models/Book";
import books from "../seedingData/books.json";

export default async function seedDatabase() {
    try{
        await seedBooks();
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