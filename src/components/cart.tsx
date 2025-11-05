'use client'

import { useState } from 'react'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Tag, 
  Edit3, 
  Receipt,
  User,
  CreditCard,
  DollarSign,
  Gift
} from 'lucide-react'
import { useCartStore, CartItem } from '@/store/cart'
import { formatCurrency, getSubtotal, getTax, getTotal, getAmountPaid, getBalanceDue } from '@/lib/utils'
import { MoneyInput } from './ui/money-input'
import { CustomerSelect } from './customer-select'
import { DiscountModal } from './discount-modal'
import { NotesModal } from './notes-modal'
import { ReceiptPreview } from './receipt-preview'

export function Cart() {
  const {
    items,
    customer,
    payments,
    discount,
    isReturnMode,
    addItem,
    removeItem,
    updateQuantity,
    updateDiscount,
    updateNotes,
    setCustomer,
    addPayment,
    removePayment,
    setCartDiscount,
    clearCart,
  } = useCartStore()

  const [showCustomerSelect, setShowCustomerSelect] = useState(false)
  const [showDiscountModal, setShowDiscountModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState<CartItem | null>(null)
  const [showReceiptPreview, setShowReceiptPreview] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'gift_card'>('cash')
  const [paymentAmount, setPaymentAmount] = useState(0)

  const subtotal = getSubtotal(items)
  const total = getTotal(items, discount || undefined)
  const amountPaid = getAmountPaid(payments)
  const balanceDue = getBalanceDue(total, payments)

  const handleAddPayment = () => {
    if (paymentAmount > 0) {
      addPayment({
        type: paymentMethod,
        amount: paymentAmount,
        reference: paymentMethod === 'card' ? `****${Math.floor(Math.random() * 10000)}` : undefined
      })
      setPaymentAmount(0)
    }
  }

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'cash': return <DollarSign className="h-4 w-4" />
      case 'card': return <CreditCard className="h-4 w-4" />
      case 'gift_card': return <Gift className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isReturnMode ? 'Return' : 'Sale'}
          </h2>
          <button
            onClick={() => setShowReceiptPreview(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <Receipt className="h-4 w-4 inline mr-1" />
            Preview
          </button>
        </div>

        {/* Customer */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowCustomerSelect(true)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <User className="h-4 w-4" />
            <span>{customer ? customer.name : 'Add Customer'}</span>
          </button>
          <button
            onClick={() => setShowDiscountModal(true)}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <Tag className="h-4 w-4" />
            <span>{discount ? 'Edit Discount' : 'Add Discount'}</span>
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Cart is empty</p>
            <p className="text-sm mt-1">Add products to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                onRemove={() => removeItem(item.id)}
                onUpdateDiscount={(discount) => updateDiscount(item.id, discount)}
                onEditNotes={() => setShowNotesModal(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {discount && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({discount.type === 'percentage' ? `${discount.value}%` : formatCurrency(discount.value)})</span>
              <span>-{formatCurrency(discount.type === 'percentage' ? subtotal * (discount.value / 100) : discount.value)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span>{formatCurrency(getTax(subtotal - (discount ? (discount.type === 'percentage' ? subtotal * (discount.value / 100) : discount.value) : 0)))}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2 border-t">
            <span>Total</span>
            <span className={isReturnMode ? 'text-red-600' : ''}>
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Payments */}
        {payments.length > 0 && (
          <div className="space-y-2 border-t pt-3">
            <div className="text-sm font-medium text-gray-700">Payments</div>
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {getPaymentIcon(payment.type)}
                  <span className="capitalize">{payment.type.replace('_', ' ')}</span>
                  {payment.reference && (
                    <span className="text-xs text-gray-500">{payment.reference}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span>{formatCurrency(payment.amount)}</span>
                  <button
                    onClick={() => removePayment(payment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-sm font-medium pt-2 border-t">
              <span>Balance Due</span>
              <span className={balanceDue > 0 ? 'text-orange-600' : balanceDue < 0 ? 'text-green-600' : ''}>
                {formatCurrency(Math.abs(balanceDue))}
                {balanceDue < 0 && ' (Change)'}
              </span>
            </div>
          </div>
        )}

        {/* Payment Input */}
        {items.length > 0 && (
          <div className="space-y-3 border-t pt-3">
            <div className="flex space-x-2">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="gift_card">Gift Card</option>
              </select>
              <MoneyInput
                value={paymentAmount}
                onChange={setPaymentAmount}
                placeholder="Amount"
                className="flex-1"
              />
              <button
                onClick={handleAddPayment}
                disabled={paymentAmount <= 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
            <button
              onClick={clearCart}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCustomerSelect && (
        <CustomerSelect
          customer={customer}
          onSelect={setCustomer}
          onClose={() => setShowCustomerSelect(false)}
        />
      )}

      {showDiscountModal && (
        <DiscountModal
          discount={discount}
          onSave={setCartDiscount}
          onClose={() => setShowDiscountModal(false)}
        />
      )}

      {showNotesModal && (
        <NotesModal
          item={showNotesModal}
          onSave={(notes) => {
            if (showNotesModal) {
              updateNotes(showNotesModal.id, notes)
            }
            setShowNotesModal(null)
          }}
          onClose={() => setShowNotesModal(null)}
        />
      )}

      {showReceiptPreview && (
        <ReceiptPreview
          onClose={() => setShowReceiptPreview(false)}
          onPrint={() => window.print()}
        />
      )}
    </div>
  )
}

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
  onUpdateDiscount: (discount: CartItem['discount']) => void
  onEditNotes: () => void
}

function CartItemRow({ item, onUpdateQuantity, onRemove, onUpdateDiscount, onEditNotes }: CartItemRowProps) {
  const itemTotal = item.price * item.quantity
  const discountAmount = item.discount
    ? item.discount.type === 'percentage'
      ? itemTotal * (item.discount.value / 100)
      : item.discount.value
    : 0
  const finalTotal = itemTotal - discountAmount

  return (
    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-gray-600">{formatCurrency(item.price)}</span>
            <span className="text-xs text-gray-500">× {item.quantity}</span>
          </div>
          {item.notes && (
            <p className="text-xs text-gray-500 mt-1 italic">{item.notes}</p>
          )}
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateDiscount(item.discount)}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            {item.discount ? 'Edit' : 'Add'} Discount
          </button>
          <button
            onClick={onEditNotes}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            <Edit3 className="h-3 w-3 inline" /> Notes
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <span className="text-sm font-medium">{formatCurrency(finalTotal)}</span>
        {item.discount && (
          <span className="text-xs text-green-600">
            {item.discount.type === 'percentage' ? `${item.discount.value}%` : formatCurrency(item.discount.value)} off
          </span>
        )}
      </div>
    </div>
  )
}