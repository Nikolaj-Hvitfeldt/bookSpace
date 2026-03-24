import { Link } from "react-router";
import type { BookList } from "~/types/bookList";
import { Button } from "../ui/button";

export type { BookList };

type BookListPageProps = {
  title: string;
  books: BookList[];
  backPath: string;
  showCurrentPage?: boolean;
};

function RatingStar({ rating }: { rating: number }) {
  //Round the rating to the nearest number
  const filledStar = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="flex gap-[2px] text-[14px] leading-none text-primary-brown">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index}>
          {index < filledStar ? (
            <img src="/globalImages/star-filled.svg" alt="Filled star" />
          ) : (
            <img src="/globalImages/star-empty.svg" alt="Empty star" />
          )}
        </div>
      ))}
    </div>
  );
}

function BookListItem({
  book,
  showCurrentPage,
}: {
  book: BookList;
  showCurrentPage?: boolean;
}) {
  const hasProgress = typeof book.progressPercentage === "number";
  const progressPercentage = hasProgress ? book.progressPercentage : undefined;

  return (
    <li className="flex gap-[10px] border-black/10">
      <div className="flex w-[120px] shrink-0 flex-col gap-[6px">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-[180px] w-[120px] rounded bg-primary-gray/50 object-cover shadow-md"
        />
        {hasProgress ? (
          <div className="mt-1 h-[4px] w-full overflow-hidden rounded-full bg-primary-brown/25">
            <div
              className="h-full rounded-full bg-primary-brown"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="card-title">{book.title}</p>
            <p className="text-sm!">by {book.authors?.join(", ")}</p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded p-1 text-black/60 hover:text-black"
            aria-label="Bookmark this book"
          >
            <div className="text-[20px] leading-none">
              <img src="/globalImages/bookmark-empty.png" alt="Bookmark" />
            </div>
          </button>
        </div>

        {typeof book.rating === "number" ? (
          <RatingStar rating={book.rating} />
        ) : null}

        <div className="mt-auto flex flex-col gap-1 self-start">
          {showCurrentPage &&
          typeof book.currentPage === "number" &&
          typeof book.pageCount === "number" &&
          book.pageCount > 0 ? (
            <p className="text-sm!">
              Page {book.currentPage} of {book.pageCount}
            </p>
          ) : null}

          <Button variant="secondary" size="small" className="text-black!">
            Reading mode
          </Button>
        </div>
      </div>
    </li>
  );
}

export default function BookListPage({
  title,
  books,
  backPath = "/",
  showCurrentPage = false,
}: BookListPageProps) {
  return (
    <div className="flex w-full flex-col">
      <header className="relative flex items-center justify-center border-b border-black/10 pb-3 -mx-[clamp(16px,4vw,24px)] px-[clamp(16px,4vw,24px)]">
        <Link
          to={backPath}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-black h-[25px] w-[25px]"
          aria-label="Go back"
        >
          {<img src="/globalImages/back-button.avif" alt="Back" />}
        </Link>
        <h1 className="font-semibold!">{title}</h1>
      </header>

      <ul className="mt-4 -ml-4 flex flex-col gap-[20px]">
        {books.map((book) => (
          <BookListItem
            key={book.id}
            book={book}
            showCurrentPage={showCurrentPage}
          />
        ))}
      </ul>
    </div>
  );
}
