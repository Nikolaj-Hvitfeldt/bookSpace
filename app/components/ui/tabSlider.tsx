import * as React from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type tabItem = {
  label: string;
  value: string;
};

type TabSliderProps = {
  items: tabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function TabSlider({
  items,
  value,
  onChange,
  className,
}: TabSliderProps) {
  return (
    <div
      className={cn(
        "flex h-8 w-full max-w-[360px] items-stretch justify-stretch overflow-hidden rounded-[10px] bg-primary-brown p-0.5",
        className,
      )}
      role="tablist"
    >
      {items.map((item, index) => {
        const selected = item.value === value;
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const only = items.length === 1;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.value)}
            className={cn(
              "flex min-h-0 min-w-0 flex-1 items-center justify-center px-1",
              "text-center text-[16px] font-medium leading-[18px] line-clamp-1",
              only && "rounded-[8px]",
              !only && isFirst && "rounded-l-[8px] rounded-r-none",
              !only && isLast && "rounded-r-[8px] rounded-l-none",
              !only && !isFirst && !isLast && "rounded-none",
              selected
                ? "bg-secondary-eggshell text-primary-brown"
                : "bg-transparent text-secondary-eggshell",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
