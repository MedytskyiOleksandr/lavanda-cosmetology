import { cn } from "@/lib/utils";
import {HTMLAttributes} from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Badge = ({
  children,
  className,
  variant = "primary",
  ...props
}: BadgeProps) => {
  const variants = {
    primary: "bg-lavender-mist text-lavender-deep",
    secondary: "bg-lavender text-white",
    outline: "border border-lavender text-lavender-deep",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium tracking-widest uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
