import * as React from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
  }
>(function Input({ label, id, className, ...props }, ref) {
  return (
    <div className="w-full">
      <label className="mb-1 block">{label}</label>
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-[10px] border border-primary-brown bg-transparent px-3 py-3",
          "text-[16px] font-medium text-secondary outline-none",
          "caret-primary-brown placeholder:text-secondary-light-grey/50",
          "focus-visible:border-primary-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/40",
          className,
        )}
        {...props}
      />
    </div>
  );
});
