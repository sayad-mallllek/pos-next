import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "./card";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label?: string;
  };
  variant?: "default" | "mint" | "destructive" | "warning";
}

function StatCard({
  className,
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
  ...props
}: StatCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="h-3 w-3" />;
    if (trend.value < 0) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.value > 0) return "text-mint-500";
    if (trend.value < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const variantStyles = {
    default: "",
    mint: "border-mint-200 dark:border-mint-800 bg-mint-50/50 dark:bg-mint-950/20",
    destructive:
      "border-destructive/30 bg-destructive/5 dark:bg-destructive/10",
    warning: "border-warning/30 bg-warning/5 dark:bg-warning/10",
  };

  return (
    <Card
      className={cn("p-6", variantStyles[variant], className)}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
        {icon && (
          <div className="rounded-lg bg-muted p-2 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          {trend && (
            <span className={cn("flex items-center gap-1", getTrendColor())}>
              {getTrendIcon()}
              {Math.abs(trend.value)}%
            </span>
          )}
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
          {trend?.label && (
            <span className="text-muted-foreground">{trend.label}</span>
          )}
        </div>
      )}
    </Card>
  );
}

export { StatCard };
