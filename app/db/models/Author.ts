import { Schema, model, Types, type InferSchemaType } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Genre name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Author slug is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export type AuthorType = InferSchemaType<typeof authorSchema> & {
  _id: Types.ObjectId;
};
export default model<AuthorType>("Author", authorSchema);
