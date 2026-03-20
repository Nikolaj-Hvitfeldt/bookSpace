import * as React from "react"

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export type ButtonVariant = "primary" | "secondary"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] transition-opacity",
        "h-[55px] text-[16px] font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-secondary text-foreground hover:opacity-90 py-[12px] px-[72px]",
        variant === "secondary" &&
          "bg-transparent text-secondary border-[1.5px] border-solid border-secondary hover:opacity-90 py-[12px] px-[141px]",
        className,
      )}
      {...props}
    />
  )
}