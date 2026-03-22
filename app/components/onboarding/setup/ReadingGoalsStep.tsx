type ReadingGoalsStepProps = {
  onNext: () => void;
};

const heading = "What’s Your Daily Reading\nGoal?";
const text =
  "Whether it’s finishing a book every week or diving deep into a long series, choose your reading goals, and we’ll help you get there.";

export default function ReadingGoalsStep({ onNext }: ReadingGoalsStepProps) {
  return (
    <>
      {/* Heading */}
      <div className="w-full text-left">
        <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
      </div>

      {/* Text */}
      <p className="mt-4 whitespace-pre-line">{text}</p>

      {/* Reading Goals Picker Content */}
      <div className="w-full text-left mt-[clamp(14px,2vh,28px)]">
        <div>Reading Goals Picker component will go here</div>
      </div>
    </>
  );
}
