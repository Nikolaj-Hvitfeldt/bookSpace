type GetStartedStepProps = {
  onNext: () => void;
};

const heading = "Dive in with Book Space,\nwhere books meet\nconnection";

export default function GetStartedStep({ onNext }: GetStartedStepProps) {
  return (
    <>
      {/* Text (left aligned) */}
      <div className="w-full text-left mt-[clamp(20px,4vh,32px)]">
        <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
      </div>
    </>
  );
}
