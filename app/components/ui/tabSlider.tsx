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
  const index = items.findIndex((item) => item.value === value);
  return (
    <div
      className={cn(
        "flex h-8 w-full max-w-[360px] items-stretch justify-stretch overflow-hidden",
        "rounded-[10px] bg-primary-brown p-0.5 relative",
        className,
      )}
      role="tablist"
    >
      <div
        className={cn(
          "pointer-events-none absolute left-0.5 top-0.5 bottom-0.5 rounded-[8px] bg-secondary-eggshell",
          "transition-transform duration-400 ease-out will-change-transform",
        )}
        style={{
          width: `calc((100% - 4px) / ${items.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      <div className="relative z-10 flex w-full min-w-0">
        {items.map((item) => {
          const isSelected = item.value === value;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChange(item.value)}
              className={cn(
                "flex min-h-0 min-w-0 flex-1 items-center justify-center px-1",
                "text-center text-[16px] font-medium leading-[18px] line-clamp-1 rounded-[8px]",

                isSelected ? " text-primary-brown" : " text-secondary-eggshell",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
