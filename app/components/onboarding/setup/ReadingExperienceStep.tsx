import { Button } from "~/components/ui/button";

type ReadingExperienceStepProps = {
  onNext: () => void;
};

const heading = "What's Your Reading\nExperience Level?";
const text =
  "Let us know your reading experience so we can tailor recommendations that fit your journey.";

export default function ReadingExperienceStep({
  onNext,
}: ReadingExperienceStepProps) {
  return (
    <>
      {/* Image */}
      <div className="flex flex-col">
        <div className="mt-6">
          {/* heading */}
          <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>

          {/* Text */}
          <p className="mt-4 whitespace-pre-line">{text}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-2">
          <Button type="button" variant="secondary">
            Beginnder
          </Button>
          <Button type="button" variant="secondary">
            Intermediate
          </Button>
          <Button type="button" variant="secondary">
            Advanced
          </Button>
        </div>
      </div>
    </>
  );
}
