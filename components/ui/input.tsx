import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full bg-background text-foreground ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input focus:border-primary focus:ring-1 focus:ring-primary/20",
        outline:
          "border border-input focus:border-primary",
        filled:
          "bg-muted border-transparent focus:bg-background focus:border-primary",
        ghost:
          "border-transparent bg-transparent focus:bg-muted",
      },
      inputSize: {
        default: "h-9 px-3 py-1.5 text-sm rounded-md",
        sm: "h-8 px-3 py-1 text-xs rounded-md",
        lg: "h-10 px-3 py-2 text-sm rounded-md",
        xl: "h-11 px-4 py-2.5 text-base rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

function Input({
  className,
  type,
  variant,
  inputSize,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant, inputSize, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
