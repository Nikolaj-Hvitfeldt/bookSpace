import * as DropdownMenuRadix from "@radix-ui/react-dropdown-menu";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type DropdownMenuOption = {
  label: string;
  value: string;
};

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="7"
      viewBox="0 0 13 7"
      fill="none"
      aria-hidden
    >
      <path
        d="M0.337891 0.368591L6.33789 5.86859L11.8379 0.368591"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export type DropdownMenuProps = {
  options: DropdownMenuOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};
export function DropdownMenu({
  options,
  value,
  onChange,
  placeholder = "Select…",
  className,
}: DropdownMenuProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label;
  const triggerText = selectedLabel ?? placeholder;
  const isPlaceholder = selectedLabel === undefined;

  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger asChild>
        <button
          type="button"
          className={cn(
            "group flex w-[110px] items-center justify-between rounded-[10px] border-[0.5px] border-solid border-black/20 p-[10px]",
            "text-left font-normal text-[14px] transition-[box-shadow,border-color]",
            "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            isPlaceholder ? "text-black/50" : "text-black",
            className,
          )}
        >
          <div className="w-[80px] shrink-0 whitespace-nowrap overflow-hidden text-ellipsis leading-[20px] text-inherit">
            {triggerText}
          </div>
          <ChevronDownIcon className="shrink-0 text-black transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content
          align="start"
          className={cn(
            "overflow-hidden rounded-[10px] border-[0.5px] border-solid border-black/20 bg-white p-[10px] shadow-md",
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <DropdownMenuRadix.Item
                key={option.value}
                className={cn(
                  "relative cursor-pointer rounded-[6px] pr-2 py-2 pl-3 font-normal",
                  "text-left font-normal text-[14px] leading-[20px] outline-none select-none transition-colors duration-150",
                  "before:pointer-events-none before:absolute before:left-1 before:top-2 before:bottom-2 before:w-px before:content-['']",
                  isSelected
                    ? cn(
                        "text-black before:bg-black",
                        "data-highlighted:bg-input",
                        "data-highlighted:text-black",
                      )
                    : cn(
                        "text-black before:bg-transparent",
                        "data-highlighted:bg-input/40",
                        "data-highlighted:text-neutral-500",
                      ),
                )}
                onSelect={() => onChange(option.value)}
              >
                {option.label}
              </DropdownMenuRadix.Item>
            );
          })}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  );
}
