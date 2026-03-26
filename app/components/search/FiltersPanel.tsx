import { Button } from "../ui/button";
import { useState, useRef, useLayoutEffect } from "react";

type AccordionContent = "slider" | "checkbox";

type SliderPair = {
  left: string;
  right: string;
};

type SliderRows = {
  "Emotional Tone": SliderPair[];
  "Content Intensity": SliderPair[];
  "Predictabillity & Style": SliderPair[];
};

const sliderRows: SliderRows = {
  "Emotional Tone": [
    { left: "Happy", right: "Sad" },
    { left: "Funny", right: "Serious" },
    { left: "Optimistic", right: "Unusual" },
  ],
  "Content Intensity": [
    { left: "Sad", right: "Disturbing" },
    { left: "Gentle", right: "Violent" },
  ],
  "Predictabillity & Style": [
    { left: "Expected", right: "Unpredictable" },
    { left: "Conventional", right: "Unusual" },
    { left: "Larger than Life", right: "Down to Earth" },
  ],
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SliderFilterRow({
  leftLabel,
  rightLabel,
  value,
  onChange,
}: {
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="text-[16px] font-medium justify-self-start">
          {leftLabel}
        </div>
        <button
          type="button"
          className="h-[22px] w-[22px] shrink-0 mx-3"
          onClick={() => setIsChecked((prev) => !prev)}
        >
          {isChecked ? (
            <img
              src="/searchImages/checkbox-filled.svg"
              alt="Checked"
              className="h-full w-full"
            />
          ) : (
            <img
              src="/searchImages/checkbox-empty.svg"
              alt="Unchecked"
              className="h-full w-full"
            />
          )}
        </button>
        <div className="text-[16px] font-medium justify-self-end">
          {rightLabel}
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        disabled={!isChecked}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "filters-slider",
          !isChecked && "filters-slider--disabled",
        )}
      />
    </div>
  );
}

function CheckboxFilterRow() {
  return (
    <div>
      <div>Checkbox content goes here</div>
    </div>
  );
}

function FilterSectionRow({
  label,
  content,
}: {
  label: string;
  content: AccordionContent;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const sliderPairs = sliderRows[label as keyof SliderRows] ?? [];
  const [sliderValues, setSliderValues] = useState<number[]>(
    sliderPairs.map(() => 50),
  );

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    if (isOpen) {
      setMaxHeight(element.scrollHeight + "px");
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-2"
      >
        <div
          className={cn(
            "text-[16px] leading-[18px] tracking-[-0.1px] [font-variant-ligatures:none] transition-[font-weight] duration-150",
            isOpen ? "font-semibold" : "font-medium",
          )}
        >
          {label}
        </div>

        {isOpen ? (
          <div className="flex h-8 w-8 items-center justify-center shrink-0">
            <img
              src="globalImages/more-arrow.svg"
              className="rotate-270 w-[24px] h-[24px] transform-rotate-90 transform-origin-center transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center shrink-0">
            <img
              src="globalImages/more-arrow.svg"
              className="rotate-90 w-[24px] h-[24px] transform-rotate-90 transform-origin-center transition-transform duration-300"
            />
          </div>
        )}
      </button>

      <div
        style={{ maxHeight }}
        className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
      >
        <div ref={contentRef} className="pb-2">
          {content === "slider" ? (
            <div className="space-y-4">
              {sliderPairs.map((pair, index) => (
                <SliderFilterRow
                  key={index}
                  leftLabel={pair.left}
                  rightLabel={pair.right}
                  value={sliderValues[index] ?? 50}
                  onChange={(nextValue) =>
                    setSliderValues((prev) =>
                      prev.map((v, i) => (i === index ? nextValue : v)),
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <CheckboxFilterRow />
          )}
        </div>
      </div>
    </div>
  );
}

function SearchFiltersAccordion({
  label,
  rows,
  content,
}: {
  label: string;
  rows: string[];
  content: AccordionContent;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const updateMaxHeight = () => {
      if (isOpen) {
        setMaxHeight(element.scrollHeight + "px");
      } else {
        setMaxHeight("0px");
      }
    };

    updateMaxHeight();

    const observer = new ResizeObserver(() => {
      if (isOpen) updateMaxHeight();
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <div className="w-full border-b border-primary-brown pb-1">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between"
      >
        {/* Title */}
        <div className="flex items-center justify-between gap-2">
          <div className="m-0 inline-flex items-baseline gap-2">
            <div className="text-[16px] font-medium leading-[18px] tracking-[-0.1px] [font-variant-ligatures:none]">
              Books by
            </div>
            <div className="text-[22px] font-semibold leading-[18px] tracking-[-0.1px] [font-variant-ligatures:none] font-[Newsreader,Georgia,serif]">
              {label}
            </div>
          </div>
        </div>

        {/* Expanding Arrows */}
        {isOpen ? (
          <div className="flex h-8 w-8 items-center justify-center shrink-0">
            <img
              src="/globalImages/more-arrow.svg"
              className="rotate-270 w-[32px] h-[32px] transform-rotate-90 transform-origin-center transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center shrink-0">
            <img
              src="/globalImages/more-arrow.svg"
              className="rotate-90 w-[32px] h-[32px] transform-rotate-90 transform-origin-center transition-transform duration-300"
            />
          </div>
        )}
      </button>

      {/* Content Section */}
      <div
        style={{ maxHeight: maxHeight }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      >
        <div ref={contentRef} className="pt-1 pb-2">
          {rows.map((row) => (
            <FilterSectionRow label={row} key={row} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchFiltersButtonFooter() {
  return (
    <div className="flex justify-between">
      <Button
        size="small"
        className="w-[165px] h-[40px] p-[10px] flex items-center justify-center gap-[10px]"
      >
        Save
      </Button>
      <Button
        variant="secondary"
        className="font-semibold! w-[165px] h-[40px] p-[10px] flex items-center justify-center gap-[10px]"
        size="small"
      >
        Clear All
      </Button>
    </div>
  );
}

export default function FiltersPanel() {
  return (
    <div>
      <div className="mt-5 flex flex-col justify-between gap-6">
        <SearchFiltersAccordion
          label="Mood & Emotions"
          rows={[
            "Emotional Tone",
            "Content Intensity",
            "Predictabillity & Style",
          ]}
          content="slider"
        />
        <SearchFiltersAccordion
          label="Character & Plot"
          rows={["Age", "Sexuality", "Gender", "Plot"]}
          content="checkbox"
        />
        <SearchFiltersButtonFooter />
      </div>
    </div>
  );
}
