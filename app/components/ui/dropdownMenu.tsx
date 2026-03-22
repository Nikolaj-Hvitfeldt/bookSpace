import * as DropdownMenuRadix from "@radix-ui/react-dropdown-menu";

export type DropdownMenuOption = {
  label: string;
  value: string;
};

export function DropdownMenu({
  options,
  value,
  onChange,
  label,
}: {
  options: DropdownMenuOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger>
        <button
          type="button"
          className="flex items-center border-[0.5px] border-solid border-secondary/20 w-[110px] p-[10px] rounded-[10px]"
        >
          {label}
        </button>
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content>
          {options.map((option) => (
            <DropdownMenuRadix.Item
              key={option.value}
              className=""
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
