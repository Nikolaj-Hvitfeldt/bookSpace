import { Schema, model, Types, type InferSchemaType } from "mongoose";

const readingProgressSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: ["currently-reading", "completed", "want-to-read"],
      default: "currently-reading",
    },
    currentPage: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

readingProgressSchema.index({ user: 1, book: 1 }, { unique: true });

export type ReadingProgressType = InferSchemaType<
  typeof readingProgressSchema
> & {
  _id: Types.ObjectId;
};
export default model<ReadingProgressType>(
  "ReadingProgress",
  readingProgressSchema,
);
