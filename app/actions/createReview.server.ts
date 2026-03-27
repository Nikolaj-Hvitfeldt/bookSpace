import { getUser } from "~/services/auth.server";
import { data, redirect } from "react-router";
import Book from "~/db/models/Book";
import Review from "~/db/models/Review";

export async function createReviewAction(
  request: Request,
  formData?: FormData,
) {
  const user = await getUser(request);

  //If the user is not found return unauthorized status code
  if (!user?._id) {
    return data({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const fd = formData ?? (await request.formData());

  const text = fd.get("text");
  const rating = fd.get("rating");
  const bookId = fd.get("bookId");

  //If the text is not a string or is empty return error
  if (!text || typeof text !== "string" || !text.trim()) {
    return data({ success: false, error: "Text is required" }, { status: 400 });
  }

  const ratingNumber =
    typeof rating === "string" ? Number(rating) : Number(rating);

  //If the rating is not a number or is not between 1 and 5 return error
  if (!Number.isFinite(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return data(
      { success: false, error: "Rating must be between 1 and 5" },
      { status: 400 },
    );
  }

  //If the book id is not a string return error code
  if (!bookId || typeof bookId !== "string") {
    return data(
      { success: false, error: "Book id is required" },
      { status: 400 },
    );
  }

  const book = await Book.findById(bookId).select("_id slug").lean();

  //If the book is not found return error
  if (!book) {
    return data({ success: false, error: "Book not found" }, { status: 404 });
  }

  const review = await Review.create({
    book: book._id,
    user: user._id,
    text: text.trim(),
    rating: ratingNumber,
  });

  return data({ success: true, review }, { status: 200 });
}
