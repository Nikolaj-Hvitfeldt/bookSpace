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
            "flex w-[110px] items-center justify-between rounded-[10px] border-[0.5px] border-solid border-black/20 p-[10px]",
            "text-left font-normal text-[14px] transition-[box-shadow,border-color]",
            "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            isPlaceholder && "text-black/50",
            className,
          )}
        >
          <div className="min-w-0 flex-1 whitespace-nowrap overflow-hidden text-ellipsis leading-[20px] text-black">
            {triggerText}
          </div>
          <ChevronDownIcon className="w-[80px]shrink-0 whitespace-nowrap overflow-hidden text-ellipsis" />
        </button>
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content
          sideOffset={4}
          align="start"
          className={cn(
            "overflow-hidden rounded-[10px] border-[0.5px] border-solid border-secondary/20 bg-white p-[10px] shadow-md",
          )}
        >
          {options.map((option) => (
            <DropdownMenuRadix.Item
              key={option.value}
              className={cn(
                "w-[80px] text-left shrink-0 align-stretch cursor-pointer rounded-[6px] px-2 py-2 font-normal text-[14px] outline-none select-none text-black",
              )}
              onSelect={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenuRadix.Item>
          ))}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  );
}
