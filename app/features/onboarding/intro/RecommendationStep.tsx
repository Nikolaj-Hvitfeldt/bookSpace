import { Button } from "../../../components/ui/button";

type RecommendationStepProps = {
  onNext: () => void;
};

const heading = "Personalized Book\nRecommendations";
const text =
  "Tell us what you like, and we’ll do the rest. Get handpicked recommendations based on your favorite genres and reading habits.";

export default function RecommendationStep({
  onNext,
}: RecommendationStepProps) {
  return (
    <>
      {/* Image */}
      <div className="flex flex-col">
        <img
          src="/onboardingImages/studying-image.avif"
          alt="image of a person studying"
          className="w-full h-auto"
        />

        <div className="mt-6">
          {/* heading */}
          <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>

          {/* Text */}
          <p className="mt-4 whitespace-pre-line">{text}</p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-auto flex w-full justify-center">
        <Button
          type="button"
          className="w-full"
          variant="secondary"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </>
  );
}
