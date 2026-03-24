import { useState } from "react";
import type { Route } from "./+types/home";
import HomeHeader from "~/components/home/HomeHeader";
import BookSection from "~/components/home/BookSection";
import { getPopularBooks, getShortBooks } from "~/db/queries/books.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Space" },
    { name: "description", content: "Your favorite reading tracker" },
  ];
}

export async function loader() {
  const popularBooks = await getPopularBooks();
  const shortBooks = await getShortBooks();
  return { popularBooks, shortBooks };
}

export default async function Home({ loaderData }: Route.ComponentProps) {
  const [searchValue, setSearchValue] = useState("");
  const { popularBooks, shortBooks } = loaderData;

  return (
    <div className="wrapper">
      <HomeHeader searchValue={searchValue} onSearchChange={setSearchValue} />
      <BookSection sectionTitle="Popular" books={popularBooks} />
      <BookSection sectionTitle="Short Escapes" books={shortBooks} />
    </div>
  );
}
