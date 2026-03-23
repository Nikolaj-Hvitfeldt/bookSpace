import { useState } from "react";
import type { Route } from "./+types/home";
import HomeHeader from "~/components/home/HomeHeader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Space" },
    { name: "description", content: "Your favorite reading tracker" },
  ];
}

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="wrapper">
      <HomeHeader searchValue={searchValue} onSearchChange={setSearchValue} />
      <div className="book-section mt-10" /> Book row Currently reading
      <div className="book-section mt-10" /> Book row Recommended
      <div className="book-section mt-10" /> Book row etc etc
    </div>
  );
}
