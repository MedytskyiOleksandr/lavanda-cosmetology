import * as React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "display" | "h1" | "h2" | "h3" | "h4";
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = "h2", variant, ...props }, ref) => {
    const variantClass = variant || Component;
    
    return (
      <Component
        ref={ref}
        className={cn(
          "text-foreground",
          variantClass === "display" && "text-display",
          variantClass === "h1" && "text-h1",
          variantClass === "h2" && "text-h2",
          variantClass === "h3" && "text-h3",
          variantClass === "h4" && "text-h4",
          className
        )}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";
