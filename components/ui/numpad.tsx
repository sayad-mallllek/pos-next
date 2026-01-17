"use client";

import * as React from "react";
import { Delete } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface NumPadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  maxLength?: number;
  allowDecimal?: boolean;
  decimalPlaces?: number;
}

function NumPad({
  className,
  value,
  onChange,
  onEnter,
  maxLength = 10,
  allowDecimal = true,
  decimalPlaces = 2,
  ...props
}: NumPadProps) {
  const handleNumber = (num: string) => {
    if (value.length >= maxLength) return;

    if (num === "." && !allowDecimal) return;
    if (num === "." && value.includes(".")) return;

    if (value.includes(".")) {
      const decimalPart = value.split(".")[1];
      if (decimalPart && decimalPart.length >= decimalPlaces && num !== ".") {
        return;
      }
    }

    if (value === "0" && num !== ".") {
      onChange(num);
    } else {
      onChange(value + num);
    }
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1) || "0");
  };

  const handleClear = () => {
    onChange("0");
  };

  const numKeys = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  return (
    <div
      className={cn("grid grid-cols-3 gap-2 select-none", className)}
      {...props}
    >
      {numKeys.map((num) => (
        <Button
          key={num}
          variant="outline"
          size="xl"
          className="text-xl font-semibold h-14"
          onClick={() => handleNumber(num)}
        >
          {num}
        </Button>
      ))}

      {allowDecimal ? (
        <Button
          variant="outline"
          size="xl"
          className="text-xl font-semibold h-14"
          onClick={() => handleNumber(".")}
          disabled={value.includes(".")}
        >
          .
        </Button>
      ) : (
        <Button
          variant="outline"
          size="xl"
          className="text-xl font-semibold h-14"
          onClick={handleClear}
        >
          C
        </Button>
      )}

      <Button
        variant="outline"
        size="xl"
        className="text-xl font-semibold h-14"
        onClick={() => handleNumber("0")}
      >
        0
      </Button>

      <Button
        variant="outline"
        size="xl"
        className="h-14"
        onClick={handleBackspace}
      >
        <Delete className="h-5 w-5" />
      </Button>

      {allowDecimal && (
        <Button
          variant="ghost"
          size="xl"
          className="text-sm h-14"
          onClick={handleClear}
        >
          Clear
        </Button>
      )}

      {onEnter && (
        <Button
          variant="mint"
          size="xl"
          className={cn(
            "text-lg font-semibold h-14",
            allowDecimal ? "col-span-2" : "col-span-3"
          )}
          onClick={onEnter}
        >
          Enter
        </Button>
      )}
    </div>
  );
}

function NumPadDisplay({
  className,
  value,
  prefix = "$",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  prefix?: string;
}) {
  return (
    <div
      className={cn(
        "text-4xl font-bold text-right p-4 bg-muted rounded-xl mb-4",
        className
      )}
      {...props}
    >
      <span className="text-muted-foreground">{prefix}</span>
      {value || "0"}
    </div>
  );
}

export { NumPad, NumPadDisplay };
