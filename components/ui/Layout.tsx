import { cn } from "@/lib/utils";
import {HTMLAttributes} from "react";

export const Container = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const Section = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <section
      className={cn("py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
};
