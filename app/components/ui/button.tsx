import * as React from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "small" | "default";
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const isSmall = size === "small";

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-[10px] whitespace-nowrap rounded-[10px] transition-opacity",
        "text-[16px] font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/40",
        "disabled:pointer-events-none disabled:opacity-50",
        isSmall ? "w-[130px] h-[40px]" : "w-[350px] h-[55px]",
        variant === "primary" &&
          (isSmall
            ? "bg-primary-brown text-foreground hover:opacity-90"
            : "bg-primary-brown text-foreground hover:opacity-90 py-[12px] px-[72px]"),
        variant === "secondary" &&
          (isSmall
            ? "border-[1.5px] border-solid border-primary-brown bg-transparent text-primary-brown hover:opacity-90"
            : "bg-transparent text-primary-brown border-[1.5px] border-solid border-primary-brown hover:opacity-90 py-[12px] px-[141px]"),
        className,
      )}
      {...props}
    />
  );
}
