import { Button } from "../ui/button";
import { useState, useRef, useLayoutEffect } from "react";
import {
  searchFilterConfig,
  type FilterRowConfig,
  type FilterAccordionConfig,
} from "./filterConfig";

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

function CheckboxFilterRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className=" text-[16px] font-medium leading-[18px] tracking-[-0.1px] [font-variant-ligatures:none]">
        {label}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="h-[22px] w-[22px] shrink-0"
      >
        {checked ? (
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
    </div>
  );
}

function FilterSectionRow({ row }: { row: FilterRowConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sliderValues, setSliderValues] = useState<number[]>(
    row.content === "slider" ? row.sliderPairs.map(() => 50) : [],
  );

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    if (isOpen) {
      setMaxHeight(element.scrollHeight + "px");
    } else {
      setMaxHeight("0px");
    }
  }, [
    isOpen,
    row.content,
    row.content === "slider" ? sliderValues.length : 0,
    row.content === "checkbox" ? selected.size : 0,
  ]);

  function toggleOption(option: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(option) ? next.delete(option) : next.add(option);
      return next;
    });
  }

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
          {row.label}
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

      {/* Show slider or checkbox content */}
      <div
        style={{ maxHeight }}
        className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
      >
        <div ref={contentRef} className="pb-2">
          {row.content === "slider" ? (
            <div className="space-y-4">
              {row.sliderPairs.map((pair, index) => (
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
            <div className="space-y-2 pt-1">
              {row.options.map((option) => (
                <CheckboxFilterRow
                  key={option}
                  label={option}
                  checked={selected.has(option)}
                  onToggle={() => toggleOption(option)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchFiltersAccordion({ group }: { group: FilterAccordionConfig }) {
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
              {group.label}
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
        <div ref={contentRef}>
          {group.rows.map((row) => (
            <FilterSectionRow row={row} key={row.label} />
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
    <div className="flex min-h-[calc(100dvh-240px)] flex-col">
      <div className="space-y-6">
        {searchFilterConfig.map((group) => (
          <SearchFiltersAccordion group={group} key={group.label} />
        ))}
      </div>
      <div className="mt-auto pt-4">
        <SearchFiltersButtonFooter />
      </div>
    </div>
  );
}
