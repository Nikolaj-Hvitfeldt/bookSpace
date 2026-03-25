import { Types } from "mongoose";
import connectDb from "../db.server";
import User from "../models/User";
import Book from "../models/Book";

type ToggleFavorite = {
  success: boolean;
  bookMarked?: boolean;
  error?: string;
};

//Using Set for fast lookup. To check everytime on an array.include(id) makes it way slow. Ask me how i know
export async function getFavoriteBooks(userId: string): Promise<Set<string>> {
  await connectDb();

  //If the user id is not valid, return an empty set
  if (!userId || !Types.ObjectId.isValid(userId)) return new Set();

  const user = await User.findById(userId).select("favoriteBooks").lean();

  //If the user has no favorite books, return an empty set
  if (!user?.favoriteBooks?.length) return new Set();

  return new Set(user.favoriteBooks.map((bookId) => bookId.toString()));
}

export async function toggleFavoriteBook(
  userId: string,
  bookId: string,
): Promise<ToggleFavorite> {
  await connectDb();

  //If the user or book id is not valid return an error
  if (!Types.ObjectId.isValid(userId)) {
    return {
      success: false,
      error: "Invalid user id",
    };
  }

  //If the book id is not valid return an error
  if (!Types.ObjectId.isValid(bookId)) {
    return {
      success: false,
      error: "Invalid book id",
    };
  }

  //If the user is not found return an error
  const user = await User.findById(userId).select("favoriteBooks").lean();
  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  //If the book does not exist return an error
  const bookExists = await Book.exists({ _id: bookId });
  if (!bookExists) {
    return { success: false, error: "Book not found" };
  }

  const objectId = new Types.ObjectId(bookId);
  const alreadyBookmarked = user.favoriteBooks.some((id) =>
    id.equals(objectId),
  );

  //If the book is already bookmarked remove it from the user's favorite books
  if (alreadyBookmarked) {
    await User.updateOne(
      { _id: userId },
      { $pull: { favoriteBooks: objectId } },
    );
    return {
      success: true,
      bookMarked: false,
    };

    //If the book is not bookmarked add it to the user's favorite books
  } else {
    await User.updateOne(
      { _id: userId },
      { $push: { favoriteBooks: objectId } },
    );
    return {
      success: true,
      bookMarked: true,
    };
  }
}
