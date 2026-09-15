import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

type SeparatorProps = React.ComponentProps<"div"> & VariantProps<typeof separatorVariants>;

function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <div
      data-slot="separator-root"
      role="separator"
      aria-orientation={orientation as "horizontal" | "vertical"}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  );
}

export { Separator, separatorVariants };
