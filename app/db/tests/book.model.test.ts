import { describe, it, expect, afterEach } from "vitest";
import Book from "../models/Book";

//Integration tests for the Book model

const book = new Book({
    title: "Test Book",
    author: ["Test Author"],
    description: "Desc",
    releaseYear: 2024,
    slug: "test book 1, the empire strikes forth",
    pageCount: 150,
    rating: 4.2,
    ratingsCount: 10,
    tags: ["Niko", "is", "cool"],
    moods: ["Happy", "Sad"],
    genres: ["Fantasy", "Romance", ],
    coverImage: { url: "Super.sick.url.com", width: 340, height: 500 },
});

describe("Book model", () => {

    afterEach(async () => {
        await Book.deleteMany({book: Book});
    });

  it("should create a new book", async () => {
    await book.save();
  });
});