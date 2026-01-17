import * as React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Separator } from "./separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: OrderItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  onClearOrder?: () => void;
  currency?: string;
  taxRate?: number;
  showTax?: boolean;
}

function OrderSummary({
  className,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClearOrder,
  currency = "$",
  taxRate = 0,
  showTax = false,
  ...props
}: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = showTax ? subtotal * taxRate : 0;
  const total = subtotal + tax;

  const formatPrice = (price: number) => `${currency}${price.toFixed(2)}`;

  return (
    <Card
      variant="default"
      className={cn("flex flex-col h-full", className)}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order Summary</CardTitle>
          {items.length > 0 && onClearOrder && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={onClearOrder}
            >
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto px-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
            <p className="text-sm">No items in order</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <OrderSummaryItem
                key={item.id}
                item={item}
                currency={currency}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
        )}
      </CardContent>

      {items.length > 0 && (
        <>
          <Separator />
          <CardFooter className="flex-col gap-4 pt-4">
            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {showTax && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Tax ({(taxRate * 100).toFixed(0)}%)
                  </span>
                  <span>{formatPrice(tax)}</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            {onCheckout && (
              <Button
                variant="mint"
                size="lg"
                className="w-full"
                onClick={onCheckout}
              >
                Checkout {formatPrice(total)}
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
}

interface OrderSummaryItemProps {
  item: OrderItem;
  currency: string;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

function OrderSummaryItem({
  item,
  currency,
  onUpdateQuantity,
  onRemove,
}: OrderSummaryItemProps) {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
      {item.image && (
        <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">
          {currency}{item.price.toFixed(2)} each
        </p>
      </div>

      <div className="flex items-center gap-2">
        {onUpdateQuantity && (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              className="h-7 w-7"
              onClick={() =>
                onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
              }
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}

        <span className="font-semibold text-sm min-w-[60px] text-right">
          {currency}{itemTotal.toFixed(2)}
        </span>

        {onRemove && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

export { OrderSummary, OrderSummaryItem };
