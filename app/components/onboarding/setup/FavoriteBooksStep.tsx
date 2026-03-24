import type { BookCovers } from "~/db/queries/books.server";
import { SearchBar } from "~/components/ui/searchbar";

type FavoriteBooksStepProps = {
  onNext: () => void;
  books: BookCovers[];
};

const heading = "Let's start with your favorite\nbooks!";
const text =
  "What do you love to read? Select your favorite\ngenres to help us recommend books you’ll\nenjoy.";

export default function FavoriteBooksStep({
  onNext,
  books,
}: FavoriteBooksStepProps) {
  return (
    <>
      {/* Heading */}
      <div className="w-full text-left">
        <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
      </div>

      {/* Text */}
      <p className="mt-4 whitespace-pre-line">{text}</p>

      <SearchBar placeholder="Search..." className="mt-[clamp(8px,2vh,16px)]" />

      {/* Book covers */}
      <div className="w-full text-right mt-[clamp(14px,2vh,28px)]">
        <div className="flex justify-center flex-wrap gap-2 border-">
          {books.map((book) => (
            <img
              key={book.id}
              src={book.coverUrl}
              className="w-24 h-32 rounded-[10px] shadow-md"
            />
          ))}
        </div>
      </div>
    </>
  );
}
