import { Link } from "react-router";
import type { BookList } from "~/types/bookList";
import BookCard from "../books/BookCard";

type BookCardGridProps = {
  books: BookList[];
  maxBooks?: number;
};
export default function BookCardGrid({
  books,
  maxBooks = 6,
}: BookCardGridProps) {
  const shown = books.slice(0, maxBooks);
  return (
    <ul className="grid grid-cols-3 gap-4">
      {shown.map((book) => {
        if (!book.bookSlug) return null;

        return (
          <li key={book.id} className="shrink-0">
            <Link to={`/books/${book.bookSlug}`} className="inline-block">
              <BookCard
                title={book.title}
                coverImage={book.coverImage}
                progressPercentage={book.progressPercentage}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
