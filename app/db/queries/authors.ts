import connectDb from "../db.server";
import Author from "../models/author";

export type Authors = {
  id: string;
  name: string;
};

const defaultLimit = 20;

export async function getAuthors(limit = defaultLimit): Promise<Authors[]> {
  await connectDb();

  const authors = await Author.find().select({ name: 1 }).limit(limit).lean();

  return authors.map((author) => ({
    id: author._id.toString(),
    name: author.name,
  }));
}
