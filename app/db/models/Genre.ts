import { Schema, model, Types, type InferSchemaType } from "mongoose";

const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Genre name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Genre slug is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export type GenreType = InferSchemaType<typeof genreSchema> & {
  _id: Types.ObjectId;
};
export default model<GenreType>("Genre", genreSchema);
