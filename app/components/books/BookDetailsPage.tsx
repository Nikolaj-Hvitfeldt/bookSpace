import { Link } from "react-router";
import type { BookDetail } from "~/types/bookList";

type BookDetailsPageProps = {
  book: BookDetail;
  backPath: string;
};

function BookHero({ book }: { book: BookDetail }) {
  return (
    <div className="mt-6 flex flex-col items-center gap-4 text-center">
      <img
        src={book.coverImage}
        alt=""
        className="h-[280px] w-[190px] rounded bg-primary-gray/50 object-cover shadow-md"
      />
      <div>
        <h1 className="card-title px-2">{book.title}</h1>
        <p className="text-sm! mt-1">
          by {book.authors.length ? book.authors.join(", ") : "Unknown author"}
        </p>
      </div>
    </div>
  );
}

export default function BookDetailsPage({
  book,
  backPath,
}: BookDetailsPageProps) {
  return (
    <div>
      <BookHero book={book} />
    </div>
  );
}
