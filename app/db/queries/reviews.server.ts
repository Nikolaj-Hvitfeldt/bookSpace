import type { Review as ReviewType } from "~/types/review";
import connectDb from "../db.server";
import Review from "../models/Review";
import { Types } from "mongoose";

type ReviewDocument = {
  _id: Types.ObjectId;
  user?: {
    _id?: Types.ObjectId;
    displayName?: string;
  };
  text: string;
  rating: number;
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
};

function getUserName(user: unknown): string {
  if (user && typeof user === "object" && "displayName" in user) {
    const name = (user as { displayName?: string }).displayName;
    return name ?? "User";
  }
  return "User";
}

export async function getReviewsByBookId(
  bookId: string,
): Promise<ReviewType[]> {
  await connectDb();

  const reviews = await Review.find({ book: bookId })
    .sort({ createdAt: -1 })
    .select({
      _id: 1,
      user: 1,
      text: 1,
      rating: 1,
      helpfulCount: 1,
      notHelpfulCount: 1,
      createdAt: 1,
      updatedAt: 1,
    })
    .populate({
      path: "user",
      select: { displayName: 1 },
    })
    .lean();

  return reviews.map((review: ReviewDocument) => ({
    id: review._id.toString(),
    userName: getUserName(review.user),
    text: review.text,
    rating: review.rating,
    helpfulCount: review.helpfulCount ?? 0,
    notHelpfulCount: review.notHelpfulCount ?? 0,
    createdAt: review.createdAt.toISOString() ?? "",
    updatedAt: review.updatedAt.toISOString() ?? "",
  }));
}
