import * as React from "react";
import { Plus, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: number;
  image?: string;
  category?: string;
  inStock?: boolean;
  quantity?: number;
  onAdd?: () => void;
  onRemove?: () => void;
  onSelect?: () => void;
  currency?: string;
  variant?: "default" | "compact" | "horizontal";
}

function ProductCard({
  className,
  name,
  price,
  image,
  category,
  inStock = true,
  quantity = 0,
  onAdd,
  onRemove,
  onSelect,
  currency = "$",
  variant = "default",
  ...props
}: ProductCardProps) {
  const formattedPrice = `${currency}${price.toFixed(2)}`;

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl border bg-card transition-all duration-200 hover:shadow-md",
          !inStock && "opacity-60",
          onSelect && "cursor-pointer hover:border-primary/50",
          className
        )}
        onClick={inStock ? onSelect : undefined}
        {...props}
      >
        {image && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{name}</h3>
          {category && (
            <p className="text-xs text-muted-foreground">{category}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-primary">{formattedPrice}</span>
          {quantity > 0 && (
            <Badge variant="mint" size="sm">
              {quantity}
            </Badge>
          )}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "relative p-3 rounded-xl border bg-card transition-all duration-200 hover:shadow-md",
          !inStock && "opacity-60",
          onSelect && "cursor-pointer hover:border-primary/50",
          className
        )}
        onClick={inStock ? onSelect : undefined}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-sm truncate">{name}</h3>
            <span className="text-sm font-semibold text-primary">
              {formattedPrice}
            </span>
          </div>
          {quantity > 0 && (
            <Badge variant="mint" size="sm" className="shrink-0">
              {quantity}
            </Badge>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:shadow-lg group",
        !inStock && "opacity-60",
        className
      )}
      {...props}
    >
      {quantity > 0 && (
        <Badge
          variant="mint"
          className="absolute top-2 right-2 z-10"
        >
          {quantity}
        </Badge>
      )}

      {!inStock && (
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 z-10"
        >
          Out of stock
        </Badge>
      )}

      <div
        className={cn(
          "relative aspect-square overflow-hidden bg-muted",
          onSelect && "cursor-pointer"
        )}
        onClick={inStock ? onSelect : undefined}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <span className="text-4xl">{name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {category && (
          <p className="text-xs text-muted-foreground mb-1">{category}</p>
        )}
        <h3 className="font-medium truncate">{name}</h3>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-primary">{formattedPrice}</span>

          {(onAdd || onRemove) && inStock && (
            <div className="flex items-center gap-1">
              {onRemove && quantity > 0 && (
                <Button
                  variant="outline"
                  size="icon-sm"
                  rounded="full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                >
                  <Minus className="h-3 w-3" />
                </Button>
              )}
              {onAdd && (
                <Button
                  variant="mint"
                  size="icon-sm"
                  rounded="full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd();
                  }}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
