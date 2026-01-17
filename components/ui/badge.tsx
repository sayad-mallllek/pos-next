import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background text-foreground",
        success: "bg-mint-500 text-white",
        warning: "bg-warning text-warning-foreground",
        mint: "bg-mint-100 text-mint-700 dark:bg-mint-900/30 dark:text-mint-400",
        ghost: "bg-muted text-muted-foreground",
      },
      size: {
        default: "px-2 py-0.5 text-xs",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-2.5 py-0.5 text-sm",
      },
      rounded: {
        default: "rounded",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, rounded, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
