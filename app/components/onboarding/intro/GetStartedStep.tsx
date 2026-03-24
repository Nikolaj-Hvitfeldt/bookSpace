import type { BookCovers } from "~/db/queries/books.server";

type GetStartedStepProps = {
  onNext: () => void;
  books: BookCovers[];
};

const heading = "Dive in with Book Space,\nwhere books meet\nconnection";

export default function GetStartedStep({ onNext, books }: GetStartedStepProps) {
  return (
    <>
      {/* Book covers */}
      <div className="w-full text-right mt-[clamp(14px,2vh,28px)]">
        <div className="flex flex-wrap gap-2">
          {books.map((book) => (
            <img
              key={book.id}
              src={book.coverUrl}
              className="w-24 h-32 rounded-[10px] shadow-lg"
            />
          ))}
        </div>

        {/* Text */}
        <div className="w-full text-left mt-[clamp(36px,4vh,72px)]">
          <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
        </div>
      </div>
    </>
  );
}
