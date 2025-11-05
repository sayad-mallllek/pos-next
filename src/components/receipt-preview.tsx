'use client'

import { X, Printer, Download } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatCurrency, getSubtotal, getTax, getTotal, getAmountPaid } from '@/lib/utils'

interface ReceiptPreviewProps {
  onClose: () => void
  onPrint: () => void
}

export function ReceiptPreview({ onClose, onPrint }: ReceiptPreviewProps) {
  const { items, customer, payments, discount } = useCartStore()

  const subtotal = getSubtotal(items)
  const total = getTotal(items, discount || undefined)
  const amountPaid = getAmountPaid(payments)

  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Receipt Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={onPrint}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                title="Print receipt"
              >
                <Printer className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Receipt Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4" id="receipt-content">
              {/* Header */}
              <div className="text-center space-y-2 pb-4 border-b">
                <h1 className="text-xl font-bold">Your Store Name</h1>
                <p className="text-sm text-gray-600">123 Main St, City, State 12345</p>
                <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
                <div className="text-xs text-gray-500 mt-2">
                  <p>Receipt #{Math.floor(Math.random() * 10000).toString().padStart(6, '0')}</p>
                  <p>{currentDate} {currentTime}</p>
                </div>
              </div>

              {/* Customer Info */}
              {customer && (
                <div className="pb-3 border-b">
                  <p className="text-sm font-medium">Customer:</p>
                  <p className="text-sm text-gray-600">{customer.name}</p>
                  {customer.email && <p className="text-sm text-gray-600">{customer.email}</p>}
                  {customer.phone && <p className="text-sm text-gray-600">{customer.phone}</p>}
                </div>
              )}

              {/* Items */}
              <div className="space-y-2 pb-3 border-b">
                <h3 className="font-medium mb-2">Items</h3>
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
                      <div className="flex justify-between">
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
                          <div>{formatCurrency(finalTotal)}</div>
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
              <div className="space-y-1 pb-3 border-b">
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
                <div className="flex justify-between font-semibold text-base pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Payments */}
              {payments.length > 0 && (
                <div className="space-y-1 pb-3 border-b">
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
              <div className="text-center space-y-2 pt-4">
                <p className="text-sm font-medium">Thank you for your purchase!</p>
                <p className="text-xs text-gray-500">Please keep this receipt for your records</p>
                <p className="text-xs text-gray-500">All sales are final</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-gray-200 flex space-x-2">
            <button
              onClick={() => {
                // TODO: Implement actual download functionality
                onPrint()
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
            <button
              onClick={onPrint}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
            background: white;
            box-shadow: none;
            border-radius: 0;
            padding: 20px;
          }
        }
      `}</style>
    </>
  )
}