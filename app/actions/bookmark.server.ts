import { toggleFavoriteBook } from "../db/queries/favorites.server";
import { getUser } from "~/services/auth.server";
import { data } from "react-router";

export async function bookmarkToggle(request: Request, formData: FormData) {
  const user = await getUser(request);

  //If the user is not found return unauthorized status code
  if (!user?._id) {
    return data({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  //If the book id is not found return error code
  const bookId = formData.get("bookId");
  if (!bookId || typeof bookId !== "string") {
    return data({ success: false, error: "Invalid book id" }, { status: 400 });
  }

  const result = await toggleFavoriteBook(user._id, bookId);

  //If the result is not successful return error code
  if (!result.success) {
    return data({ success: false, error: result.error }, { status: 400 });
  }

  //If the result is successful return new bookmark status and success code
  return data(
    { success: true, bookmarked: result.bookmarked },
    { status: 200 },
  );
}

export async function bookmarkAction(request: Request) {
  const formData = await request.formData();
  return bookmarkToggle(request, formData);
}
