"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const RadioGroupContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: "",
  onValueChange: () => {},
});

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function RadioGroup({
  className,
  value,
  defaultValue = "",
  onValueChange,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  return (
    <RadioGroupContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange }}
    >
      <div
        role="radiogroup"
        className={cn("grid gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

const radioItemVariants = cva(
  "aspect-square border ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "border-input data-[state=checked]:border-primary data-[state=checked]:text-primary",
        mint: "border-input data-[state=checked]:border-mint-400 data-[state=checked]:text-mint-400",
        filled:
          "border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
      },
      size: {
        default: "h-4 w-4 rounded-full",
        sm: "h-3.5 w-3.5 rounded-full",
        lg: "h-5 w-5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const radioIndicatorVariants = cva("fill-current", {
  variants: {
    size: {
      default: "h-2.5 w-2.5",
      sm: "h-2 w-2",
      lg: "h-3 w-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    VariantProps<typeof radioItemVariants> {
  value: string;
}

function RadioGroupItem({
  className,
  variant,
  size,
  value,
  ...props
}: RadioGroupItemProps) {
  const { value: selectedValue, onValueChange } =
    React.useContext(RadioGroupContext);
  const isChecked = selectedValue === value;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      className={cn(radioItemVariants({ variant, size }), className)}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {isChecked && <Circle className={cn(radioIndicatorVariants({ size }))} />}
    </button>
  );
}

export { RadioGroup, RadioGroupItem };
