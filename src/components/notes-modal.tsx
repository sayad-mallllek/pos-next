'use client'

import { useState } from 'react'
import { X, Edit3 } from 'lucide-react'
import { CartItem } from '@/store/cart'

interface NotesModalProps {
  item: CartItem | null
  onSave: (notes: string) => void
  onClose: () => void
}

export function NotesModal({ item, onSave, onClose }: NotesModalProps) {
  const [notes, setNotes] = useState(item?.notes || '')

  const handleSave = () => {
    onSave(notes.trim())
    onClose()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!item) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <Edit3 className="h-5 w-5 mr-2" />
            Item Notes
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-600">
              ${item.price.toFixed(2)} × {item.quantity}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes for this item
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Add any special instructions or notes..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Press Ctrl+Enter to save, Esc to cancel
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 flex space-x-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Notes
          </button>
        </div>
      </div>
    </div>
  )
}