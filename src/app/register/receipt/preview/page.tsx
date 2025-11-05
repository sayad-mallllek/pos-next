'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { formatCurrency, getSubtotal, getTax, getTotal, getAmountPaid } from '@/lib/utils'

export default function ReceiptPreviewPage() {
  const router = useRouter()
  const { items, customer, payments, discount } = useCartStore()

  const subtotal = getSubtotal(items)
  const total = getTotal(items, discount || undefined)
  const amountPaid = getAmountPaid(payments)

  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  useEffect(() => {
    // Auto-print when page loads
    window.print()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full" id="receipt-content">
        {/* Header */}
        <div className="text-center space-y-2 pb-6 border-b">
          <h1 className="text-2xl font-bold">Your Store Name</h1>
          <p className="text-sm text-gray-600">123 Main St, City, State 12345</p>
          <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
          <div className="text-xs text-gray-500 mt-3">
            <p>Receipt #{Math.floor(Math.random() * 10000).toString().padStart(6, '0')}</p>
            <p>{currentDate} {currentTime}</p>
          </div>
        </div>

        {/* Customer Info */}
        {customer && (
          <div className="py-4 border-b">
            <p className="text-sm font-medium mb-2">Customer:</p>
            <p className="text-sm text-gray-600">{customer.name}</p>
            {customer.email && <p className="text-sm text-gray-600">{customer.email}</p>}
            {customer.phone && <p className="text-sm text-gray-600">{customer.phone}</p>}
            {customer.loyaltyPoints && (
              <p className="text-sm text-amber-600 mt-1">Loyalty Points: {customer.loyaltyPoints}</p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="space-y-3 py-4 border-b">
          <h3 className="font-medium mb-3">Items</h3>
          {items.map((item, index) => {
            const itemTotal = item.price * item.quantity
            const discountAmount = item.discount
              ? item.discount.type === 'percentage'
                ? itemTotal * (item.discount.value / 100)
                : item.discount.value
              : 0
            const finalTotal = itemTotal - discountAmount

            return (
              <div key={item.id} className="text-sm">
                <div className="flex justify-between mb-1">
                  <div className="flex-1">
                    <span className="font-medium">{index + 1}. {item.name}</span>
                    <div className="text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </div>
                    {item.notes && (
                      <div className="text-xs text-gray-500 italic mt-1">
                        Note: {item.notes}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(finalTotal)}</div>
                    {item.discount && (
                      <div className="text-xs text-green-600">
                        -{item.discount.type === 'percentage' ? `${item.discount.value}%` : formatCurrency(item.discount.value)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Totals */}
        <div className="space-y-2 py-4 border-b">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {discount && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({discount.type === 'percentage' ? `${discount.value}%` : formatCurrency(discount.value)}):</span>
              <span>-{formatCurrency(discount.type === 'percentage' ? subtotal * (discount.value / 100) : discount.value)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Tax (8%):</span>
            <span>{formatCurrency(getTax(subtotal - (discount ? (discount.type === 'percentage' ? subtotal * (discount.value / 100) : discount.value) : 0)))}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Payments */}
        {payments.length > 0 && (
          <div className="space-y-2 py-4 border-b">
            <h3 className="font-medium mb-2">Payments</h3>
            {payments.map((payment) => (
              <div key={payment.id} className="flex justify-between text-sm">
                <span className="capitalize">{payment.type.replace('_', ' ')}:</span>
                <span>{formatCurrency(payment.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between font-medium text-sm pt-2">
              <span>Amount Paid:</span>
              <span>{formatCurrency(amountPaid)}</span>
            </div>
            <div className="flex justify-between font-medium text-sm">
              <span>Change:</span>
              <span>{formatCurrency(amountPaid - total)}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center space-y-3 pt-6">
          <p className="text-base font-medium">Thank you for your purchase!</p>
          <p className="text-sm text-gray-500">Please keep this receipt for your records</p>
          <p className="text-sm text-gray-500">All sales are final</p>
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-400">Powered by POS System</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-2 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Print Receipt
          </button>
          <button
            onClick={() => router.push('/register')}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Back to Register
          </button>
        </div>
      </div>
    </div>
  )
}