import { Link, useNavigate } from "react-router";
import type { BookDetail } from "~/types/bookDetail";
import { BookmarkButton } from "./BookmarkButton";
import { Button } from "../ui/button";
import { useState, useRef, useLayoutEffect } from "react";
import BookSection from "./BookSection";
import type { BookCardItem } from "../home/BookCard";
import ReviewSection from "./ReviewSection";
import type { Review } from "~/types/review";

type BookDetailsPageProps = {
  book: BookDetail;
  backPath: string;
  authorBooks: BookCardItem[];
  similarBooks: BookCardItem[];
  reviews: Review[];
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
  backPath = "/",
  bookId,
  isBookmarked,
}: {
  backPath: string;
  bookId: string;
  isBookmarked: boolean;
}) {
  const navigate = useNavigate();

  return (
    <header className="flex w-full items-start justify-between">
      <button onClick={() => navigate(-1)} className="pt-1">
        <img
          src="/globalImages/back-button.avif"
          alt="back"
          className="h-[25px] w-[35px]"
        />
      </button>
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
  const [maxHeight, setMaxHeight] = useState("44px");
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element) return;
    if (isExpanded) {
      setMaxHeight(element.scrollHeight + "px");
    } else {
      setMaxHeight("44px");
    }
  }, [isExpanded, book.description]);

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-2 pt-2">
      <div role="button" onClick={toggleDescription} className="cursor-pointer">
        <div className="flex items-start justify-between">
          <p className="text-base font-semibold!">Description</p>

          <button type="button" className="shrink-0">
            <img
              src="/globalImages/more-arrow.svg"
              alt="arrow-down"
              className={`h-4 w-4 rotate-90 ${isExpanded ? "rotate-270" : ""} transition-transform duration-300`}
            />
          </button>
        </div>

        <div
          ref={textRef}
          style={{ maxHeight: maxHeight }}
          className="mt-1 overflow-hidden transition-[max-height] duration-300 ease-in-out"
        >
          <div className="mt-1 text-[15px] font-normal not-italic leading-[22px] text-black whitespace-pre-wrap">
            {book.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookDetailsPage({
  book,
  backPath,
  authorBooks,
  similarBooks,
  reviews,
}: BookDetailsPageProps) {
  console.log("BookDetailsPage reviews", reviews?.length, reviews?.[0]);

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
      {authorBooks.length > 0 ? (
        <BookSection
          sectionTitle="Other books by this Author"
          books={authorBooks}
          morePath={
            book.authorSlugs?.[0] ? `/authors/${book.authorSlugs[0]}` : "/"
          }
        />
      ) : null}
      {similarBooks.length > 0 ? (
        <BookSection
          sectionTitle="Similar Books"
          books={similarBooks}
          morePath={
            book.genreSlugs?.[0] ? `/books/genres/${book.genreSlugs[0]}` : "/"
          }
        />
      ) : null}
      <ReviewSection reviews={reviews || []} />
    </div>
  );
}
