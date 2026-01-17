import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva("relative w-full overflow-hidden bg-muted", {
  variants: {
    size: {
      default: "h-2 rounded-full",
      sm: "h-1 rounded-full",
      lg: "h-3 rounded-full",
      xl: "h-4 rounded-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const progressIndicatorVariants = cva(
  "h-full transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        mint: "bg-mint-400",
        success: "bg-mint-500",
        warning: "bg-warning",
        destructive: "bg-destructive",
        gradient: "bg-gradient-to-r from-mint-400 to-forest-400",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: false,
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
}

function Progress({
  className,
  value = 0,
  max = 100,
  size,
  variant,
  animated,
  showValue,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      {showValue && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <div
          className={cn(
            progressIndicatorVariants({ variant, animated }),
            "rounded-full"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export { Progress, progressVariants };
