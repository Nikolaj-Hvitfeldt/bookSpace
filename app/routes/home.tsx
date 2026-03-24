import { useState } from "react";
import type { Route } from "./+types/home";
import HomeHeader from "~/components/home/HomeHeader";
import BookSection from "~/components/home/BookSection";
import { getPopularBooks } from "~/db/queries/books.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Space" },
    { name: "description", content: "Your favorite reading tracker" },
  ];
}

export async function loader() {
  const popularBooks = await getPopularBooks();
  return { popularBooks };
}

export default async function Home({ loaderData }: Route.ComponentProps) {
  const [searchValue, setSearchValue] = useState("");
  const { popularBooks } = loaderData;

  return (
    <div className="wrapper">
      <HomeHeader searchValue={searchValue} onSearchChange={setSearchValue} />
      <BookSection sectionTitle="Currently Reading" books={popularBooks} />
    </div>
  );
}
