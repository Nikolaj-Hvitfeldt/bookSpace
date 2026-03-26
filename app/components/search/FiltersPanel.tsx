import { Button } from "../ui/button";
import { useState, useRef, useLayoutEffect } from "react";
import {
  searchFilterConfig,
  type FilterRowConfig,
  type FilterAccordionConfig,
} from "./filterConfig";
import { useNavigation, Form } from "react-router";
import { useMemo } from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// checkbox options per row label. f.eks all the checkboxes for Age in a set
type CheckboxSelectedByRow = Record<string, Set<string>>;

// sliders enabled per row label. like aboce
type SliderEnabledByRow = Record<string, boolean[]>;
type SliderValuesByRow = Record<string, number[]>;

function buildInitialSliderState(): {
  enabled: SliderEnabledByRow;
  values: SliderValuesByRow;
} {
  const enabled: SliderEnabledByRow = {};
  const values: SliderValuesByRow = {};

  for (const group of searchFilterConfig) {
    for (const row of group.rows) {
      // Initailize each slider pair as disabled with default value as 50 (the middle value)
      if (row.content === "slider") {
        enabled[row.label] = row.sliderPairs.map(() => false);
        values[row.label] = row.sliderPairs.map(() => 50);
      }
    }
  }
  return { enabled, values };
}

function SliderFilterRow({
  leftLabel,
  rightLabel,
  enabled,
  value,
  onToggleEnabled,
  onChange,
}: {
  leftLabel: string;
  rightLabel: string;
  value: number;
  enabled: boolean;
  onToggleEnabled: () => void;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="text-[16px] font-medium justify-self-start">
          {leftLabel}
        </div>
        <button
          type="button"
          className="h-[22px] w-[22px] shrink-0 mx-3"
          onClick={onToggleEnabled}
        >
          {enabled ? (
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
        disabled={!enabled}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn("filters-slider", !enabled && "filters-slider--disabled")}
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

function FilterSectionRow({
  row,
  selectedOptions,
  sliderEnabled,
  sliderValues,
  onToggleOption,
  onToggleSliderEnabled,
  onSliderValueChange,
}: {
  row: FilterRowConfig;
  selectedOptions: Set<string>;
  sliderEnabled: boolean[];
  sliderValues: number[];
  onToggleOption: (option: string) => void;
  onToggleSliderEnabled: (pairIndex: number) => void;
  onSliderValueChange: (pairIndex: number, value: number) => void;
}) {
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
  }, [
    isOpen,
    row.content,
    selectedOptions.size,
    sliderEnabled.length,
    sliderValues.length,
  ]);

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
                  enabled={sliderEnabled[index] ?? false}
                  value={sliderValues[index] ?? 50}
                  onToggleEnabled={() => onToggleSliderEnabled(index)}
                  onChange={(nextValue) =>
                    onSliderValueChange(index, nextValue)
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
                  checked={selectedOptions.has(option)}
                  onToggle={() => onToggleOption(option)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchFiltersAccordion({
  group,
  checkboxSelectedByRow,
  sliderEnabledByRow,
  sliderValuesByRow,
  onToggleOption,
  onToggleSliderEnabled,
  onSliderValueChange,
}: {
  group: FilterAccordionConfig;
  checkboxSelectedByRow: CheckboxSelectedByRow;
  sliderEnabledByRow: SliderEnabledByRow;
  sliderValuesByRow: SliderValuesByRow;
  onToggleOption: (rowLabel: string, option: string) => void;
  onToggleSliderEnabled: (rowLabel: string, pairIndex: number) => void;
  onSliderValueChange: (
    rowLabel: string,
    pairIndex: number,
    value: number,
  ) => void;
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
            <FilterSectionRow
              row={row}
              key={row.label}
              selectedOptions={checkboxSelectedByRow[row.label] ?? new Set()}
              sliderEnabled={sliderEnabledByRow[row.label] ?? []}
              sliderValues={sliderValuesByRow[row.label] ?? []}
              onToggleOption={(option) => onToggleOption(row.label, option)}
              onToggleSliderEnabled={(pairIndex) =>
                onToggleSliderEnabled(row.label, pairIndex)
              }
              onSliderValueChange={(pairIndex, value) =>
                onSliderValueChange(row.label, pairIndex, value)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchFiltersButtonFooter({
  isSubmitting,
  onClearAll,
  isSaveDisabled,
}: {
  isSubmitting: boolean;
  onClearAll: () => void;
  isSaveDisabled: boolean;
}) {
  return (
    <div className="flex justify-between">
      <Button
        size="small"
        className="w-[165px] h-[40px] p-[10px] flex items-center justify-center gap-[10px]"
        disabled={isSaveDisabled}
      >
        Save
      </Button>
      <Button
        variant="secondary"
        className="font-semibold! w-[165px] h-[40px] p-[10px] flex items-center justify-center gap-[10px]"
        size="small"
        onClick={onClearAll}
        disabled={isSubmitting}
      >
        Clear All
      </Button>
    </div>
  );
}

export default function FiltersPanel() {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" &&
    navigation.formMethod?.toLowerCase() === "post" &&
    (navigation.formAction?.endsWith("/search") ?? false);

  //Initialize the slider state with the default values
  const initialSlider = useMemo(() => buildInitialSliderState(), []);
  const [sliderEnabledByRow, setSliderEnabledByRow] =
    useState<SliderEnabledByRow>(initialSlider.enabled);

  const [checkboxSelectedByRow, setCheckboxSelectedByRow] =
    useState<CheckboxSelectedByRow>({});
  const [sliderValuesByRow, setSliderValuesByRow] = useState<SliderValuesByRow>(
    initialSlider.values,
  );

  // Function to toggle the checkboxes
  function toggleOption(rowLabel: string, option: string) {
    setCheckboxSelectedByRow((prev) => {
      const next = new Set(prev[rowLabel] ?? []);
      next.has(option) ? next.delete(option) : next.add(option);
      return { ...prev, [rowLabel]: next };
    });
  }

  // Function to toggle the slider checkboxes
  function toggleSliderEnabled(rowLabel: string, pairIndex: number) {
    setSliderEnabledByRow((prev) => {
      const row = [...(prev[rowLabel] ?? [])];
      const current = row[pairIndex] ?? false;
      row[pairIndex] = !current;
      return { ...prev, [rowLabel]: row };
    });
  }

  // Function to update slider values
  function setSliderValue(rowLabel: string, pairIndex: number, value: number) {
    setSliderValuesByRow((prev) => {
      const row = [...(prev[rowLabel] ?? [])];
      row[pairIndex] = value;
      return { ...prev, [rowLabel]: row };
    });
  }

  // Clears all filters back to initial state
  function clearAll() {
    setCheckboxSelectedByRow({});
    const freshState = buildInitialSliderState();
    setSliderEnabledByRow(freshState.enabled);
    setSliderValuesByRow(freshState.values);
  }

  // selected all the checkboxes for the Character & Plot group
  const selectedTags = useMemo(() => {
    const tagsGroup = searchFilterConfig.find(
      (group) => group.label === "Character & Plot",
    );
    if (!tagsGroup) return [];
    return tagsGroup.rows.flatMap((row) =>
      Array.from(checkboxSelectedByRow[row.label] ?? []),
    );
  }, [checkboxSelectedByRow]);

  // selected all the sliders for the Mood & Emotions group
  const selectedMoods = useMemo(() => {
    const moodsGroup = searchFilterConfig.find(
      (group) => group.label === "Mood & Emotions",
    );
    if (!moodsGroup) return [];
    const values: string[] = [];
    for (const row of moodsGroup.rows) {
      if (row.content !== "slider") continue;
      row.sliderPairs.forEach((pair, index) => {
        const enabled = sliderEnabledByRow[row.label]?.[index] ?? false;
        const val = sliderValuesByRow[row.label]?.[index] ?? 50;
        if (!enabled) return;
        values.push(val < 50 ? pair.left : pair.right);
      });
    }
    return values;
  }, [sliderEnabledByRow, sliderValuesByRow]);

  // Disable the Save button if there are no filters selected
  const hasAnyCheckboxSelected =
    selectedTags.length > 0 || selectedMoods.length > 0;
  const isSaveDisabled = isSubmitting || !hasAnyCheckboxSelected;

  return (
    <Form
      method="post"
      action="/search"
      className="flex min-h-[calc(100dvh-240px)] flex-col"
    >
      {/* Hidden inputs for form submission */}
      <input type="hidden" name="moods" value={selectedMoods.join(",")} />
      <input type="hidden" name="tags" value={selectedTags.join(",")} />

      <div className="space-y-6">
        {searchFilterConfig.map((group) => (
          <SearchFiltersAccordion
            group={group}
            key={group.label}
            checkboxSelectedByRow={checkboxSelectedByRow}
            sliderEnabledByRow={sliderEnabledByRow}
            sliderValuesByRow={sliderValuesByRow}
            onToggleOption={toggleOption}
            onToggleSliderEnabled={toggleSliderEnabled}
            onSliderValueChange={setSliderValue}
          />
        ))}
      </div>
      <div className="mt-auto pt-4">
        <SearchFiltersButtonFooter
          onClearAll={clearAll}
          isSubmitting={isSubmitting}
          isSaveDisabled={isSaveDisabled}
        />
      </div>
    </Form>
  );
}
