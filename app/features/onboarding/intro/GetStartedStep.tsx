import type { BookCovers } from "~/db/queries/books";

type GetStartedStepProps = {
  onNext: () => void;
  books: BookCovers[];
};

const heading = "Dive in with Book Space,\nwhere books meet\nconnection";

export default function GetStartedStep({ onNext, books }: GetStartedStepProps) {
  return (
    <>
      {/* Text */}
      <div className="w-full text-left mt-[clamp(20px,4vh,32px)]">
        <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
      </div>
      {/* Book covers */}
      <div className="w-full text-right mt-[clamp(20px,4vh,32px)]">
        <div className="flex flex-wrap gap-2">
          {books.map((book) => (
            <img
              key={book.id}
              src={book.coverUrl}
              className="w-24 h-32 object-cover"
            />
          ))}
        </div>
      </div>
    </>
  );
}
