// Core UI Components - Mintlify-inspired POS UI Kit

// Basic Components
export { Button, buttonVariants, type ButtonProps } from "./button";
export { Input, inputVariants, type InputProps } from "./input";
export { Textarea, textareaVariants, type TextareaProps } from "./textarea";
export { Label } from "./label";
export { PasswordInput } from "./password-input";

// Selection Components
export { Checkbox, checkboxVariants, type CheckboxProps } from "./checkbox";
export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps } from "./radio-group";
export { Switch, switchVariants, type SwitchProps } from "./switch";
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  type SelectProps,
  type SelectTriggerProps,
} from "./select";

// Layout Components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
  type CardProps,
} from "./card";
export { Separator, type SeparatorProps } from "./separator";
export { ScrollArea, ScrollBar, type ScrollAreaProps } from "./scroll-area";

// Feedback Components
export { Alert, AlertTitle, AlertDescription, alertVariants } from "./alert";
export { Badge, badgeVariants, type BadgeProps } from "./badge";
export { Progress, progressVariants, type ProgressProps } from "./progress";
export { Skeleton, SkeletonText, SkeletonCard, SkeletonProduct } from "./skeleton";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";

// Data Display Components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";
export { Avatar, AvatarImage, AvatarFallback, avatarVariants, type AvatarProps } from "./avatar";
export { StatCard, type StatCardProps } from "./stat-card";
export { EmptyState, type EmptyStateProps } from "./empty-state";
export { Kbd, type KbdProps } from "./kbd";

// Navigation Components
export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps, type TabsListProps, type TabsTriggerProps, type TabsContentProps } from "./tabs";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  type DropdownMenuProps,
} from "./dropdown-menu";

// Overlay Components
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogProps,
} from "./dialog";

// POS-Specific Components
export { SearchBar, searchBarVariants, type SearchBarProps } from "./search-bar";
export { NumPad, NumPadDisplay, type NumPadProps } from "./numpad";
export { ProductCard, type ProductCardProps } from "./product-card";
export { OrderSummary, OrderSummaryItem, type OrderSummaryProps, type OrderItem } from "./order-summary";
