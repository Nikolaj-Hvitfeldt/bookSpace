import { useState } from "react";
import type { Route } from "./+types/home";
import HomeHeader from "~/components/home/HomeHeader";
import BookSection from "~/components/home/BookSection";
import {
  getPopularBooks,
  getRecommendedBooks,
  getShortBooks,
  getLongBooks,
} from "~/db/queries/books.server";
import { getUserData } from "~/services/auth.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Space" },
    { name: "description", content: "Your favorite reading tracker" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserData(request);
  const popularBooks = await getPopularBooks();
  const shortBooks = await getShortBooks();
  const recommendedBooks = await getRecommendedBooks(
    25,
    user?._id.toString() || "",
  );
  const longBooks = await getLongBooks();
  return { popularBooks, shortBooks, recommendedBooks, longBooks };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [searchValue, setSearchValue] = useState("");
  const { popularBooks, shortBooks, recommendedBooks, longBooks } = loaderData;

  return (
    <div className="wrapper">
      <HomeHeader searchValue={searchValue} onSearchChange={setSearchValue} />
      <BookSection sectionTitle="Recommended" books={recommendedBooks} />
      <BookSection sectionTitle="Popular" books={popularBooks} />
      <BookSection sectionTitle="Short Escapes" books={shortBooks} />
      <BookSection sectionTitle="Epic Journeys" books={longBooks} />
    </div>
  );
}
