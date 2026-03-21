type CommunityStepProps = {
  onNext: () => void;
};

const heading = "Join the Conversation";
const text =
  "Chat about the books you love, share reviews, and join book clubs with a community of passionate readers.";

export default function CommunityStep({ onNext }: CommunityStepProps) {
  return (
    <>
      <div className="relative mx-auto w-full max-w-[360px] aspect-360/290">
        {/* Phone conversation image */}
        <img
          src="/onboardingImages/convo-image.avif"
          alt="Conversation between two phones"
          aria-hidden={true}
          className="absolute left-[12%] top-[5%] h-[30%] w-[30%] object-contain"
        />

        {/* Person Reading Image */}
        <img
          src="/onboardingImages/reflecting-image.avif"
          alt="image of a person studying"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <div className="mt-6">
        {/* heading */}
        <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>

        {/* Text */}
        <p className="mt-4 whitespace-pre-line">{text}</p>
      </div>
    </>
  );
}
