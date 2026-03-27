import type { BookCovers } from "~/db/queries/books.server";
import OnboardingBookCardGrid from "../OnboardingBookGrid";

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
          <OnboardingBookCardGrid books={books} maxBooks={9} />
        </div>

        {/* Text */}
        <div className="w-full text-left mt-[clamp(36px,4vh,72px)]">
          <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
        </div>
      </div>
    </>
  );
}
