import connectDb from "../db.server";
import Author from "../models/Author";

export type Authors = {
  id: string;
  name: string;
};

export async function getAuthors(): Promise<Authors[]> {
  await connectDb();

  const authors = await Author.find().select({ name: 1 }).lean();

  return authors.map((author) => ({
    id: author._id.toString(),
    name: author.name,
  }));
}
