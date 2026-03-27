import { describe, it, expect, beforeEach, afterEach } from "vitest";
import mongoose from "mongoose";
import Author from "../../../app/db/models/Author";
import Book from "../../../app/db/models/Book";
import { searchBooksByTitleOrAuthor } from "../../../app/db/queries/books.server";

describe("searchBooksByTitleOrAuthor integration test", () => {
  let testAuthorId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    const testAuthor = await Author.create({
      name: "Nikolaj Hvitfeldt",
      slug: "nikolaj-hvitfeldt-search",
    });
    testAuthorId = testAuthor._id;

    await Book.create({
      title: "How to search like a good boy",
      author: [testAuthorId],
      description: "delete easily",
      releaseYear: 2024,
      slug: "how-to-search-like-a-good-boy",
      pageCount: 200,
      rating: 4.4,
      ratingsCount: 42,
      tags: ["plot driven"],
      moods: ["tense"],
      genres: [],
      coverImage: {
        url: "https://super-sick-url.jpg",
        width: 340,
        height: 500,
      },
    });
  });

  afterEach(async () => {
    await Book.deleteMany({ description: "delete easily" });
    await Author.deleteMany({ slug: "nikolaj-hvitfeldt-search" });
  });

  it("returns mapped book fields including author names and slug", async () => {
    const results = await searchBooksByTitleOrAuthor();

    const found = results.find(
      (book) => book.bookSlug === "how-to-search-like-a-good-boy",
    );

    expect(found).toBeDefined();
    expect(found?.title).toBe("How to search like a good boy");
    expect(found?.authors).toContain("Nikolaj Hvitfeldt");
    expect(found?.bookSlug).toBe("how-to-search-like-a-good-boy");
    expect(found?.coverImage).toBeTruthy();
  });
});
