import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CartItem } from '@/store/cart'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function generateId(): string {
  return crypto.randomUUID()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getStockStatus(stock: number): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  color: string
  text: string
} {
  if (stock === 0) {
    return { status: 'out-of-stock', color: 'text-red-600', text: 'Out of Stock' }
  }
  if (stock < 10) {
    return { status: 'low-stock', color: 'text-yellow-600', text: `Low Stock (${stock})` }
  }
  return { status: 'in-stock', color: 'text-green-600', text: `In Stock (${stock})` }
}

// Helper functions for cart calculations
export const getSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity
    const discountAmount = item.discount
      ? item.discount.type === 'percentage'
        ? itemTotal * (item.discount.value / 100)
        : item.discount.value
      : 0
    return total + itemTotal - discountAmount
  }, 0)
}

export const getTax = (subtotal: number, taxRate = 0.08): number => {
  return subtotal * taxRate
}

export const getTotal = (items: CartItem[], discount?: { type: 'percentage' | 'fixed'; value: number }): number => {
  const subtotal = getSubtotal(items)
  const discountAmount = discount
    ? discount.type === 'percentage'
      ? subtotal * (discount.value / 100)
      : discount.value
    : 0
  const afterDiscount = subtotal - discountAmount
  return afterDiscount + getTax(afterDiscount)
}

export const getAmountPaid = (payments: { amount: number }[]): number => {
  return payments.reduce((total, payment) => total + payment.amount, 0)
}

export const getBalanceDue = (total: number, payments: { amount: number }[]): number => {
  return total - getAmountPaid(payments)
}