import { describe, it, expect, beforeEach, afterEach } from "vitest";
import mongoose from "mongoose";
import Author from "../../../app/db/models/Author";
import Book from "../../../app/db/models/Book";
import Genre from "../../../app/db/models/Genre";
import { getBooksByFilters } from "../../../app/db/queries/books.server";

describe("getBooksByFilters integration test", () => {
  let testAuthorId: mongoose.Types.ObjectId;
  let testGenreId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    const testAuthor = await Author.create({
      name: "Nikolaj Hvitfeldt",
      slug: "nikolaj-hvitfeldt-filters",
    });
    testAuthorId = testAuthor._id;

    const testGenre = await Genre.create({
      name: "test genre",
      slug: "test-genre",
    });
    testGenreId = testGenre._id;

    await Book.insertMany([
      {
        title: "How to test like a good boy",
        author: [testAuthorId],
        description: "delete easily",
        releaseYear: 2021,
        slug: "how-to-test-like-a-good-boy",
        pageCount: 200,
        rating: 4.1,
        ratingsCount: 15,
        tags: ["character driven"],
        moods: [`${testGenreId}-tense`],
        genres: [testGenreId],
        coverImage: {
          url: "https://super-sick-url.jpg",
          width: 340,
          height: 500,
        },
      },
      {
        title: "So You Want to Test Like a Good Boy?",
        author: [testAuthorId],
        description: "delete easily",
        releaseYear: 2022,
        slug: "so-you-want-to-test-like-a-good-boy",
        pageCount: 210,
        rating: 4.3,
        ratingsCount: 20,
        tags: [`${testGenreId}-excellent`],
        moods: ["happy"],
        genres: [testGenreId],
        coverImage: {
          url: "https://even-sicker-url.jpg",
          width: 340,
          height: 500,
        },
      },
      {
        title: "Lord of the Tests",
        author: [testAuthorId],
        description: "delete easily",
        releaseYear: 2023,
        slug: "lord-of-the-tests",
        pageCount: 180,
        rating: 3.5,
        ratingsCount: 5,
        tags: ["romance"],
        moods: ["joyful"],
        genres: [testGenreId],
        coverImage: {
          url: "https://i-dont-know.jpg",
          width: 340,
          height: 500,
        },
      },
    ]);
  });

  afterEach(async () => {
    await Book.deleteMany({ description: "delete easily" });
    await Author.deleteMany({ slug: "nikolaj-hvitfeldt-filters" });
    await Genre.deleteMany({ slug: "test-genre" });
  });

  it("does match books by mood or tag and excludes non-matching books", async () => {
    const results = await getBooksByFilters({
      moods: [`${testGenreId}-tense`],
      tags: [`${testGenreId}-excellent`],
      limit: 50,
    });

    const resultingSlugs = results.map((book) => book.bookSlug);
    expect(resultingSlugs).toContain("how-to-test-like-a-good-boy");
    expect(resultingSlugs).toContain("so-you-want-to-test-like-a-good-boy");
    expect(resultingSlugs).not.toContain("lord-of-the-tests");
  });

  it("returns empty array when no filters are provided", async () => {
    const results = await getBooksByFilters({ moods: [], tags: [] });
    expect(results).toEqual([]);
  });
});
