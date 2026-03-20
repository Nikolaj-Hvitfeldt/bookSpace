import { describe, it, expect, afterEach } from "vitest";
import Book from "../models/Book";

//Integration tests for the Book model


const testSlug = `unique-string-${Date.now()}`;

describe("Book model", () => {

    afterEach(async () => {
        await Book.deleteMany({slug: testSlug});
    });

  it("should create a new book", async () => {
    const testBook = new Book({
        title: "Test Book",
        author: ["Test Author"],
        description: "Desc",
        releaseYear: 2024,
        slug: testSlug,
        pageCount: 150,
        rating: 4.2,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: ["Fantasy", "Romance", ],
        coverImage: { url: "Super.sick.url.com", width: 340, height: 500 },
    });
    await testBook.save();
    expect(testBook.id).toBeDefined();
  });
});