import * as React from "react";
import { Search, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const searchBarVariants = cva(
  "flex items-center gap-2 w-full bg-background text-foreground ring-offset-background transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        filled:
          "bg-muted border-transparent focus-within:bg-background focus-within:border-primary",
        outline: "border-2 border-input focus-within:border-primary",
      },
      size: {
        default: "h-10 px-3 rounded-lg",
        sm: "h-9 px-3 rounded-md text-sm",
        lg: "h-12 px-4 rounded-xl",
        xl: "h-14 px-5 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof searchBarVariants> {
  onClear?: () => void;
  showClear?: boolean;
}

function SearchBar({
  className,
  variant,
  size,
  value,
  onClear,
  showClear = true,
  ...props
}: SearchBarProps) {
  const hasValue = Boolean(value && String(value).length > 0);

  return (
    <div className={cn(searchBarVariants({ variant, size }), className)}>
      <Search className="h-4 w-4 text-muted-foreground shrink-0" />
      <input
        type="text"
        value={value}
        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-inherit"
        {...props}
      />
      {showClear && hasValue && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-full p-0.5 hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}

export { SearchBar, searchBarVariants };
