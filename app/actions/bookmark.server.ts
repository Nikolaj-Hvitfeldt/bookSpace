import { toggleFavoriteBook } from "../db/queries/favorites.server";
import { getUser } from "~/services/auth.server";
import { data } from "react-router";

export async function bookmarkAction(request: Request) {
  const user = await getUser(request);

  //If the user is not found return unauthorized status code
  if (!user?._id) {
    return data({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  //If the book id is not found return error code
  const bookId = formData.get("bookId");
  if (!bookId || typeof bookId !== "string") {
    return data({ ok: false, error: "Invalid book id" }, { status: 400 });
  }

  const result = await toggleFavoriteBook(user._id, bookId);

  //If the result is not successful return error code
  if (!result.success) {
    return data({ ok: false, error: result.error }, { status: 400 });
  }

  //If the result is successful return new bookmark status and success code
  return data({ ok: true, bookMarked: result.bookMarked }, { status: 200 });
}
