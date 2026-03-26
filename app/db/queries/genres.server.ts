import connectDb from "../db.server";
import Genre from "../models/Genre";
import Book from "../models/Book";

export type Genres = {
  id: string;
  name: string;
};

export type GenreWithCovers = {
  name: string;
  slug: string;
  urls: string[];
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

function ensureCovers(covers: string[]): [string, string, string] {
  //If there is no cover use the fallback cover
  const fallbackCover = covers[0] ?? "/testImages/testCard.png";

  //make sure there is 3 covers always
  const firstCover = covers[0] ?? fallbackCover;
  const secondCover = covers[1] ?? firstCover;
  const thirdCover = covers[2] ?? secondCover;

  return [firstCover, secondCover, thirdCover];
}

export async function getGenresWithPreviewCovers(): Promise<GenreWithCovers[]> {
  await connectDb();

  //Query on genres that have at least one book with a non-empty genres array and a usable cover
  //Also filter books with no / empty genres
  const genresWithCovers = await Book.collection
    .aggregate<GenreWithCovers>([
      {
        //Filter books with a non-empty genres array and a usable cover
        $match: {
          genres: { $exists: true, $type: "array", $not: { $size: 0 } },
          "coverImage.url": {
            $exists: true,
            $type: "string",
            $regex: /./,
          },
        },
      },

      //Unwind the genres array to get one document per genre
      { $unwind: "$genres" },
      { $sort: { ratingsCount: -1 } },
      {
        // For each genre,list all cover URLs
        $group: {
          _id: "$genres",
          urls: { $push: "$coverImage.url" },

          //Get bookCount to see most popular genres (for sorting later)
          bookCount: { $sum: 1 },
        },
      },
      {
        //Keep only the top 3 cover URLs for each genre and the top rating and book count
        $project: {
          _id: 0,
          genreId: "$_id",
          urls: { $slice: ["$urls", 3] },
          bookCount: 1,
        },
      },
      {
        //Join with the genres collection to get the genre name and slug
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "matchedGenre",
        },
      },

      //Unwind the matchedGenre array to get one document per genre of our newly joined collection
      { $unwind: "$matchedGenre" },
      {
        //Keep the genre name and slug and the top 3 cover URLs and the top rating and book count
        $project: {
          _id: 0,
          name: "$matchedGenre.name",
          slug: "$matchedGenre.slug",
          urls: 1,
          bookCount: 1,
        },
      },
      //Sort by top rating and book count and then by name
      { $sort: { bookCount: -1, name: 1 } },

      //Drop the bookCount again before returning
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
          urls: 1,
        },
      },
    ])
    .toArray();

  //remove genres with no slug or name, map the remaining genres to our UI type, and ensures 3 covers always
  return genresWithCovers
    .filter((genreWithCovers) => genreWithCovers.slug && genreWithCovers.name)
    .map((genreWithCovers) => ({
      name: genreWithCovers.name,
      slug: genreWithCovers.slug,
      urls: ensureCovers(genreWithCovers.urls),
    }));
}
