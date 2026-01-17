import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full bg-background text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "border border-input focus:border-primary focus:ring-1 focus:ring-primary/20",
        outline: "border border-input focus:border-primary",
        filled:
          "bg-muted border-transparent focus:bg-background focus:border-primary",
        ghost: "border-transparent bg-transparent focus:bg-muted",
      },
      textareaSize: {
        default: "px-3 py-2 text-sm rounded-md",
        sm: "px-3 py-1.5 text-xs rounded-md",
        lg: "px-3 py-2.5 text-sm rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

function Textarea({
  className,
  variant,
  textareaSize,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(textareaVariants({ variant, textareaSize, className }))}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
