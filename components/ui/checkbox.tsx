"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer shrink-0 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
        mint: "border-input data-[state=checked]:bg-mint-400 data-[state=checked]:border-mint-400 data-[state=checked]:text-white",
        outline:
          "border-2 border-input data-[state=checked]:border-primary data-[state=checked]:text-primary",
      },
      size: {
        default: "h-4 w-4 rounded",
        sm: "h-3.5 w-3.5 rounded-sm",
        lg: "h-5 w-5 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const checkIconVariants = cva("", {
  variants: {
    size: {
      default: "h-3 w-3",
      sm: "h-2.5 w-2.5",
      lg: "h-3.5 w-3.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof checkboxVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Checkbox({
  className,
  variant,
  size,
  checked,
  defaultChecked = false,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);
  const controlledChecked = checked ?? isChecked;

  const handleClick = () => {
    const newChecked = !controlledChecked;
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={controlledChecked}
      data-state={controlledChecked ? "checked" : "unchecked"}
      className={cn(checkboxVariants({ variant, size }), className)}
      onClick={handleClick}
      {...props}
    >
      {controlledChecked && (
        <Check className={cn(checkIconVariants({ size }))} strokeWidth={3} />
      )}
    </button>
  );
}

export { Checkbox, checkboxVariants };
