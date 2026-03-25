import { Schema, model, Types, type InferSchemaType } from "mongoose";

const reviewSchema = new Schema(
  {
    book: {
      type: Types.ObjectId,
      ref: "Book",
      required: [true, "Book is required"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    notHelpfulCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export type ReviewType = InferSchemaType<typeof reviewSchema> & {
  _id: Types.ObjectId;
};
export default model<ReviewType>("Review", reviewSchema);
