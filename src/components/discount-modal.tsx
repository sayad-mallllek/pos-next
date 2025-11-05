'use client'

import { useState } from 'react'
import { X, Tag, Percent, DollarSign } from 'lucide-react'

interface DiscountModalProps {
  discount: { type: 'percentage' | 'fixed'; value: number } | null
  onSave: (discount: { type: 'percentage' | 'fixed'; value: number } | null) => void
  onClose: () => void
}

export function DiscountModal({ discount, onSave, onClose }: DiscountModalProps) {
  const [type, setType] = useState<'percentage' | 'fixed'>(discount?.type || 'percentage')
  const [value, setValue] = useState(discount?.value.toString() || '')

  const handleSave = () => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      onSave({ type, value: numValue })
      onClose()
    }
  }

  const handleRemove = () => {
    onSave(null)
    onClose()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-sm mx-4">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <Tag className="h-5 w-5 mr-2" />
            {discount ? 'Edit Discount' : 'Add Discount'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setType('percentage')}
                className={`p-3 border rounded-md flex items-center justify-center space-x-2 transition-colors ${
                  type === 'percentage'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Percent className="h-4 w-4" />
                <span>Percentage</span>
              </button>
              <button
                onClick={() => setType('fixed')}
                className={`p-3 border rounded-md flex items-center justify-center space-x-2 transition-colors ${
                  type === 'fixed'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <DollarSign className="h-4 w-4" />
                <span>Fixed Amount</span>
              </button>
            </div>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={type === 'percentage' ? '10' : '5.00'}
                min="0"
                max={type === 'percentage' ? '100' : undefined}
                step={type === 'percentage' ? '1' : '0.01'}
              />
              {type === 'percentage' && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  %
                </div>
              )}
            </div>
            {type === 'percentage' && value && (
              <p className="text-xs text-gray-500 mt-1">
                {value}% discount will be applied
              </p>
            )}
          </div>

          {/* Preview */}
          {value && parseFloat(value) > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                Discount to apply:{' '}
                <span className="font-medium text-gray-900">
                  {type === 'percentage' ? `${value}%` : `$${parseFloat(value).toFixed(2)}`}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {discount && (
            <button
              onClick={handleRemove}
              className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
            >
              Remove Discount
            </button>
          )}
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!value || parseFloat(value) <= 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {discount ? 'Update' : 'Add'} Discount
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}