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

  it("should fail when title is missing", async () => {
    await expect(
      Book.create({
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
        genres: ["Fantasy", "Romance", ],
      }),
    ).rejects.toThrow();
  });

  it("should fail when slug is missing", async () => {
    await expect(
      Book.create({
        title: "No Slug",
        author: ["Test Author"],
        description: "Desc",
        releaseYear: 2024,
        pageCount: 150,
        rating: 4.2,
        ratingsCount: 10,
        tags: ["Niko", "is", "cool"],
        moods: ["Happy", "Sad"],
        genres: ["Fantasy", "Romance", ],
      }),
    ).rejects.toThrow();
  });

  
  it("should fail when coverImage is missing", async () => {
    await expect(
      Book.create({
        title: "No Cover image",
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
      }),
    ).rejects.toThrow();
  });

  it("should fail when realeaseYear is greater than current year", async () => {
    await expect(
        Book.create({
            title: "Rating too high",
            author: ["Test Author"],
            description: "Desc",
            releaseYear: new Date().getFullYear() + 1,
            slug: testSlug,
            pageCount: 150,
            rating: 6,
            ratingsCount: 10,
            tags: ["Niko", "is", "cool"],
            moods: ["Happy", "Sad"],
            genres: ["Fantasy", "Romance", ],
          }),
        ).rejects.toThrow();
  });

  it("should fail when realeaseYear is below 0 (who cares about religious scriptures)", async () => {
    await expect(
        Book.create({
            title: "Rating too high",
            author: ["Test Author"],
            description: "Desc",
            releaseYear: -1,
            slug: testSlug,
            pageCount: 150,
            rating: 6,
            ratingsCount: 10,
            tags: ["Niko", "is", "cool"],
            moods: ["Happy", "Sad"],
            genres: ["Fantasy", "Romance", ],
          }),
        ).rejects.toThrow();
  });

  it("should fail when rating is greater than 5", async () => {
    await expect(
        Book.create({
            title: "Rating too high",
            author: ["Test Author"],
            description: "Desc",
            releaseYear: 2024,
            slug: testSlug,
            pageCount: 150,
            rating: 6,
            ratingsCount: 10,
            tags: ["Niko", "is", "cool"],
            moods: ["Happy", "Sad"],
            genres: ["Fantasy", "Romance", ],
          }),
        ).rejects.toThrow();
  });

  it("should fail when rating is below 0", async () => {
    await expect(
        Book.create({
            title: "Rating too low",
            author: ["Test Author"],
            description: "Desc",
            releaseYear: 2024,
            slug: testSlug,
            pageCount: 150,
            rating: -1,
            ratingsCount: 10,
            tags: ["Niko", "is", "cool"],
            moods: ["Happy", "Sad"],
            genres: ["Fantasy", "Romance", ],
          }),
        ).rejects.toThrow();
  });

  it("should enforce unique slug", async () => {
    await Book.create({
        title: "Unique Slug 1",
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
    await expect(
        Book.create({
            title: "Unique Slug 2",
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
        }),
        ).rejects.toThrow();
    });
});