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
        <div className="relative mx-auto w-full max-w-[360px] aspect-360/290">
          <img
            src="/onboardingImages/studying-image.avif"
            alt="Person reading and receiving recommendations"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>

        <div className="mt-6">
          {/* heading */}
          <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>

          {/* Text */}
          <p className="mt-4 whitespace-pre-line">{text}</p>
        </div>
      </div>
    </>
  );
}
