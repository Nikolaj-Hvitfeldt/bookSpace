import connectDb from "../db.server";
import Genre from "../models/Genre";

export type Genres = {
  id: string;
  name: string;
};

const defaultLimit = 15;

export async function getGenres(limit = defaultLimit): Promise<Genres[]> {
  await connectDb();

  const genres = await Genre.find().select({ name: 1 }).limit(limit).lean();

  return genres.map((genre) => ({
    id: genre._id.toString(),
    name: genre.name,
  }));
}
