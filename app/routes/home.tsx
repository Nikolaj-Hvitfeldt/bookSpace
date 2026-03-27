import type { Route } from "./+types/home";
import HomeHeader from "~/components/home/HomeHeader";
import BookSection from "~/components/books/BookSection";
import {
  getPopularBooks,
  getRecommendedBooks,
  getShortBooks,
  getLongBooks,
  getCurrentlyReadingBooks,
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
  const currentlyReadingBooks = await getCurrentlyReadingBooks(
    user?._id.toString() || "",
    25,
  );
  return {
    popularBooks,
    shortBooks,
    recommendedBooks,
    longBooks,
    currentlyReadingBooks,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {
    popularBooks,
    shortBooks,
    recommendedBooks,
    longBooks,
    currentlyReadingBooks,
  } = loaderData;

  return (
    <div>
      <HomeHeader />
      {currentlyReadingBooks.length > 0 && (
        <BookSection
          sectionTitle="Currently Reading"
          books={currentlyReadingBooks}
          morePath="/books/currently-reading"
        />
      )}
      <BookSection
        sectionTitle="Recommended"
        books={recommendedBooks}
        morePath="/books/recommended"
      />
      <BookSection
        sectionTitle="Popular"
        books={popularBooks}
        morePath="/books/popular"
      />
      <BookSection
        sectionTitle="Short Escapes"
        books={shortBooks}
        morePath="/books/short-escapes"
      />
      <BookSection
        sectionTitle="Epic Journeys"
        books={longBooks}
        morePath="/books/epic-journeys"
      />
    </div>
  );
}
