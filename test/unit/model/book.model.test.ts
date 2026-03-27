import { describe, it, expect, afterEach, beforeEach } from "vitest";
import Book from "../../../app/db/models/Book";
import Author from "../../../app/db/models/Author";
import Genre from "../../../app/db/models/Genre";
import mongoose from "mongoose";

const testSlug = `unique-string-${Date.now()}`;
let testAuthorId: mongoose.Types.ObjectId;
let testGenreId: mongoose.Types.ObjectId;

describe("Book model", () => {
  beforeEach(async () => {
    const testAuthor = await Author.create({
      name: `Test Author ${testSlug}`,
      slug: `test-author-${testSlug}`,
    });
    testAuthorId = testAuthor._id;
    const testGenre = await Genre.create({
      name: `Test Genre ${testSlug}`,
      slug: `test-genre-${testSlug}`,
    });
    testGenreId = testGenre._id;
  });

  afterEach(async () => {
    await Book.deleteMany({ slug: testSlug });
    await Book.deleteMany({ slug: "same-slug" });
    await Author.deleteMany({ slug: `test-author-${testSlug}` });
    await Genre.deleteMany({ slug: `test-genre-${testSlug}` });
  });

  it("should create a new book", async () => {
    const testBook = new Book({
      title: "Test Book",
      author: [testAuthorId],
      description: "Desc",
      releaseYear: 2024,
      slug: testSlug,
      pageCount: 150,
      rating: 4.2,
      ratingsCount: 10,
      tags: ["Niko", "is", "cool"],
      moods: ["Happy", "Sad"],
      genres: [testGenreId],
      coverImage: { url: "Super.sick.url.com", width: 340, height: 500 },
    });
    await testBook.save();
    expect(testBook.id).toBeDefined();
  });

  it("should fail when title is missing", async () => {
    await expect(
      Book.create({
        author: [testAuthorId],
        description: "Desc",
        releaseYear: 2024,
        slug: testSlug,
        pageCount: 150,
        rating: 4.2,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
      }),
    ).rejects.toThrow();
  });

  it("should fail when author is missing", async () => {
    await expect(
      Book.create({
        title: "No Author(s)",
        description: "Desc",
        releaseYear: 2024,
        slug: testSlug,
        pageCount: 150,
        rating: 4.2,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
      }),
    ).rejects.toThrow();
  });

  it("should fail when slug is missing", async () => {
    await expect(
      Book.create({
        title: "No Slug",
        author: [testAuthorId],
        description: "Desc",
        releaseYear: 2024,
        pageCount: 150,
        rating: 4.2,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
      }),
    ).rejects.toThrow();
  });

  it("should fail when coverImage is missing", async () => {
    await expect(
      Book.create({
        title: "No Cover image",
        author: [testAuthorId],
        description: "Desc",
        releaseYear: 2024,
        slug: testSlug,
        pageCount: 150,
        rating: 4.2,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
      }),
    ).rejects.toThrow();
  });

  it("should fail when realeaseYear is greater than current year", async () => {
    await expect(
      Book.create({
        title: "Rating too high",
        author: [testAuthorId],
        description: "Desc",
        releaseYear: new Date().getFullYear() + 1,
        slug: testSlug,
        pageCount: 150,
        rating: 6,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
      }),
    ).rejects.toThrow();
  });

  it("should fail when realeaseYear is below 0 (who cares about religious scriptures)", async () => {
    await expect(
      Book.create({
        title: "Rating too high",
        author: [testAuthorId],
        description: "Desc",
        releaseYear: -1,
        slug: testSlug,
        pageCount: 150,
        rating: 6,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
      }),
    ).rejects.toThrow();
  });

  it("should fail when rating is greater than 5", async () => {
    await expect(
      Book.create({
        title: "Rating too high",
        author: [testAuthorId],
        description: "Desc",
        releaseYear: 2024,
        slug: testSlug,
        pageCount: 150,
        rating: 6,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
      }),
    ).rejects.toThrow();
  });

  it("should fail when rating is below 0", async () => {
    await expect(
      Book.create({
        title: "Rating too low",
        author: [testAuthorId],
        description: "Desc",
        releaseYear: 2024,
        slug: testSlug,
        pageCount: 150,
        rating: -1,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
      }),
    ).rejects.toThrow();
  });

  it("should enforce unique slug", async () => {
    await Book.create({
      title: "Unique Slug 1",
      author: [testAuthorId],
      description: "Desc",
      releaseYear: 2024,
      slug: "same-slug",
      pageCount: 150,
      rating: 4.2,
      ratingsCount: 10,
      tags: ["Niko", "is", "cool"],
      moods: ["Happy", "Sad"],
      genres: [testGenreId],
      coverImage: { url: "Super.sick.url.com", width: 340, height: 500 },
    });
    await expect(
      Book.create({
        title: "Unique Slug 2",
        author: [testAuthorId],
        description: "Desc",
        releaseYear: 2024,
        slug: "same-slug",
        pageCount: 150,
        rating: 4.2,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: [testGenreId],
        coverImage: { url: "Super.sick.url.com", width: 340, height: 500 },
      }),
    ).rejects.toThrow();
  });
});
