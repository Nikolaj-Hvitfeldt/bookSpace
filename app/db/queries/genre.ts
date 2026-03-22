import connectDb from "../db.server";
import Genre from "../models/Genre";

export type Genres = {
  id: string;
  name: string;
};

export async function getGenres(): Promise<Genres[]> {
  await connectDb();

  const genres = await Genre.find().select({ name: 1 }).lean();

  return genres.map((genre) => ({
    id: genre._id.toString(),
    name: genre.name,
  }));
}
