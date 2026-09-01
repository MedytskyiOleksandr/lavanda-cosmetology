import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-secondary shadow-soft hover:shadow-hover",
      secondary: "bg-secondary text-white hover:bg-primary shadow-soft hover:shadow-hover",
      outline: "border border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "text-primary hover:bg-lavender-mist",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-8 text-base",
      lg: "h-14 px-10 text-lg",
      icon: "h-10 w-10",
    };

    const classes = cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);

Button.displayName = "Button";
