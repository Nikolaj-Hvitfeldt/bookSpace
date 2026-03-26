import { Button } from "../ui/button";
import { useState, useRef, useLayoutEffect } from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FilterSectionRow({ label }: { label: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

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
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      >
        <div ref={contentRef} className="pb-2">
          <div>Content goes here</div>
        </div>
      </div>
    </div>
  );
}

function SearchFiltersAccordion({
  label,
  rows,
}: {
  label: string;
  rows: string[];
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
              src="globalImages/more-arrow.svg"
              className="rotate-270 w-[32px] h-[32px] transform-rotate-90 transform-origin-center transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center shrink-0">
            <img
              src="globalImages/more-arrow.svg"
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
            <FilterSectionRow label={row} key={row} />
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
        />
        <SearchFiltersAccordion
          label="Character & Plot"
          rows={["Age", "Sexuality", "Gender", "Plot"]}
        />
        <SearchFiltersButtonFooter />
      </div>
    </div>
  );
}
