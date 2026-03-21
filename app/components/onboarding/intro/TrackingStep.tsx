type TrackingStepProps = {
  onNext: () => void;
};

const heading = "Track Your Reading Journey";
const text =
  "Set reading goals, track your progress, and keep a record of every book you’ve finished, because every chapter counts.";

export default function TrackingStep({ onNext }: TrackingStepProps) {
  return (
    <>
      {/* Image */}
      <div className="flex flex-col">
        <div className="relative mx-auto w-full max-w-[360px] aspect-360/290">
          <img
            src="/onboardingImages/messy-image.avif"
            alt="Person slipping and throwing pages everywhere"
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
