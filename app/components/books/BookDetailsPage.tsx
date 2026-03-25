import { Link } from "react-router";
import type { BookDetail } from "~/types/bookList";
import { BookmarkButton } from "./BookmarkButton";
import { Button } from "../ui/button";
import { useState } from "react";
import BookSection from "./BookSection";

type BookDetailsPageProps = {
  book: BookDetail;
  backPath: string;
};

function BookHero({ book }: { book: BookDetail }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <img
        src={book.coverImage}
        alt=""
        className="h-[340px] w-[225px] rounded bg-primary-gray/50 object-cover shadow-md"
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

function BookDetailHeader({
  backPath,
  bookId,
  isBookmarked,
}: {
  backPath: string;
  bookId: string;
  isBookmarked: boolean;
}) {
  return (
    <header className="flex w-full items-start justify-between">
      <Link to={backPath} className="pt-1">
        <img
          src="/globalImages/back-button.avif"
          alt="back"
          className="h-[25px] w-[35px]"
        />
      </Link>
      <BookmarkButton
        bookId={bookId}
        isBookmarked={isBookmarked}
        className="shrink-0 pt-1"
      />
    </header>
  );
}

function BookMetaData({ book }: { book: BookDetail }) {
  const ratingLabel = (book.rating ?? 0).toFixed(1).replace(".", ",");
  const genreLabel = book.genres?.[0] ?? "-";
  const pagesLabel = book.pageCount ? book.pageCount.toString() : "-";
  return (
    <div>
      <div className="flex flex-row justify-center gap-3 mt-5">
        <Button variant="secondary" size="small" className="text-black!">
          Reading mode
        </Button>
        <Button variant="secondary" size="small" className="text-black!">
          Join the chat
        </Button>
      </div>
      <div className="mt-5 flex w-full items-center border-t border-primary-brown pt-5 text-sm text-black divide-x divide-primary-brown">
        <div className="flex flex-1 flex-row justify-center items-center gap-2">
          <img
            src="/globalImages/star-empty.svg"
            alt="rating"
            className="h-4 w-4"
          />
          <div className="tabular-nums">{ratingLabel}</div>
        </div>
        <div className="flex flex-1 flex-row justify-center items-center gap-2">
          <img
            src="/bookDetails/genre-icon.svg"
            alt="genre"
            className="h-4 w-4"
          />
          <div>{genreLabel}</div>
        </div>
        <div className="flex flex-1 flex-row justify-center items-center gap-2">
          <img
            src="/bookDetails/book-icon.svg"
            alt="pages"
            className="h-4 w-4"
          />
          <div>{pagesLabel}</div>
        </div>
      </div>
    </div>
  );
}

function BookDescription({ book }: { book: BookDetail }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-2 pt-2">
      <div className="flex items-start justify-between">
        <p className="text-base font-semibold!">Description</p>

        <button
          type="button"
          onClick={() => setIsExpanded((e) => !e)}
          className="shrink-0"
        >
          <img
            src="/globalImages/more-arrow.svg"
            alt="arrow-down"
            className={`h-4 w-4 rotate-90 ${isExpanded ? "rotate-270" : ""} transition-transform duration-300`}
          />
        </button>
      </div>
      <div className="mt-1 text-[15px] font-normal not-italic leading-[22px] text-black whitespace-pre-wrap">
        <div
          className={[
            "text-[15px] font-normal not-italic leading-[22px] text-black whitespace-pre-wrap",
            isExpanded ? "" : "line-clamp-2 overflow-hidden",
          ].join(" ")}
        >
          {book.description}
        </div>
      </div>
    </div>
  );
}

export default function BookDetailsPage({
  book,
  backPath,
}: BookDetailsPageProps) {
  return (
    <div className="flex flex-col w-full">
      <BookDetailHeader
        backPath={backPath}
        bookId={book.id}
        isBookmarked={book.isBookmarked ?? false}
      />
      <BookHero book={book} />
      <BookMetaData book={book} />
      <BookDescription book={book} />
      <BookSection
        sectionTitle="Other books by this Author"
        books={[]}
        morePath="/author/${book.authors[0]}"
      />
    </div>
  );
}
