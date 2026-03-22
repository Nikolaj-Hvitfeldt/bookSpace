import { DropdownMenu } from "~/components/ui/dropdownMenu";
import { useState, useMemo } from "react";

type ReadingGoalsStepProps = {
  onNext: () => void;
};

const heading = "What’s Your Daily Reading\nGoal?";
const text =
  "Whether it’s finishing a book every week or diving deep into a long series, choose your reading goals, and we’ll help you get there.";

const menuOptions = [
  {
    label: "Minutes",
    value: "minutes",
  },
  {
    label: "Hours",
    value: "hours",
  },
];

type GoalUnit = "minutes" | "hours";

function boundsForUnit(unit: GoalUnit) {
  if (unit === "minutes") return { min: 10, max: 480, step: 10 }; // minutes max 8 hours
  return { min: 1, max: 8, step: 1 }; // hours max 8 hours
}

function nearestValidAmount(value: number, unit: GoalUnit): number {
  const { min, max, step } = boundsForUnit(unit);

  if (!Number.isFinite(value)) {
    return min;
  }

  //Nearest valid step from min value
  const stepsIndex = Math.round((value - min) / step);
  let result = min + stepsIndex * step;

  if (result > max) result = max;
  if (result < min) result = min;
  return result;
}

function convertAmountForUnitChange(
  amount: number,
  from: GoalUnit,
  to: GoalUnit,
): number {
  //Convert to the nearest valid amount if re-applying the same unit
  if (from === to) {
    return nearestValidAmount(amount, to);
  }

  //Converts minutes to hours
  if (from === "minutes" && to === "hours") {
    const hours = Math.round(amount / 60);
    return nearestValidAmount(hours, "hours");
  }

  //Converts hours to minutes
  if (from === "hours" && to === "minutes") {
    return nearestValidAmount(amount * 60, "minutes");
  }

  //Redundant but we get TypeScript errors if there is no return
  return nearestValidAmount(amount, to);
}

type ReadingGoalPickerProps = {
  amount: number;
  unit: GoalUnit;
  onAmountChange: (amount: number) => void;
  onUnitChange: (unit: GoalUnit) => void;
};

function ReadingGoalPicker({
  amount,
  unit,
  onAmountChange,
  onUnitChange,
}: ReadingGoalPickerProps) {
  const { min, max, step } = useMemo(() => boundsForUnit(unit), [unit]);

  function handleUnitChange(nextUnit: GoalUnit) {
    if (nextUnit === unit) return;
    onAmountChange(convertAmountForUnitChange(amount, unit, nextUnit));
    onUnitChange(nextUnit);
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-stretch gap-[12px]">
      <div className="items-center grid grid-cols-[60px_1fr_60px] gap-2">
        <button
          type="button"
          onClick={() =>
            onAmountChange(nearestValidAmount(amount - step, unit))
          }
          disabled={amount <= min}
          className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[40px] gap-[10px] border-2 border-solid border-primary-brown bg-white text-[22px] font-medium text-primary-brown transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/40 disabled:pointer-events-none disabled:opacity-40"
        >
          <img
            src="/onboardingImages/minus-sign.avif"
            alt="minus sign"
            className="w-[30px] h-[30px]"
          ></img>
        </button>

        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={amount}
          onChange={(event) => {
            const value = event.target.valueAsNumber;
            if (Number.isNaN(value)) return;
            onAmountChange(nearestValidAmount(value, unit));
          }}
          className="w-full h-[60px] max-w-[200px] border-none bg-transparent text-center font-sans text-[56px] font-semibold leading-none tracking-tight text-primary-brown outline-none [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={() =>
            onAmountChange(nearestValidAmount(amount + step, unit))
          }
          disabled={amount >= max}
          className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[40px] gap-[10px] border-2 border-solid border-primary-brown bg-white text-[22px] font-medium text-primary-brown transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/40 disabled:pointer-events-none disabled:opacity-40"
        >
          {/* Using png format for plus sign as the image looks washed in avif format*/}
          <img
            src="/onboardingImages/plus-sign.png"
            alt="plus sign"
            className="w-[30px] h-[30px]"
          ></img>
        </button>
      </div>

      <div className="grid grid-cols-[60px_1fr_60px] items-center">
        <div className="text-sm text-center font-medium">-{step}</div>

        <div className="flex justify-center">
          <DropdownMenu
            options={menuOptions}
            value={unit}
            onChange={(value) => handleUnitChange(value as GoalUnit)}
            className="min-w-[110px] w-auto border-primary-brown/30"
          />
        </div>
        <div className="text-sm text-center font-medium">+{step}</div>
      </div>
    </div>
  );
}

export default function ReadingGoalsStep({ onNext }: ReadingGoalsStepProps) {
  const [amount, setAmount] = useState(30);
  const [unit, setUnit] = useState<GoalUnit>("minutes");

  return (
    <>
      {/* Heading */}
      <div className="w-full text-left">
        <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
      </div>

      {/* Text */}
      <p className="mt-4 whitespace-pre-line">{text}</p>

      {/* Reading Goals Picker Content */}
      <div className="w-full mt-[clamp(14px,2vh,28px)] flex justify-center">
        <ReadingGoalPicker
          amount={amount}
          unit={unit}
          onAmountChange={setAmount}
          onUnitChange={setUnit}
        />
      </div>
    </>
  );
}
