'use client'

import { useState } from 'react'
import { X, Search, Plus, User, Mail, Phone, Star } from 'lucide-react'

interface CustomerSelectProps {
  customer: any | null
  onSelect: (customer: any | null) => void
  onClose: () => void
}

interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  loyaltyPoints?: number
}

// Mock customer data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0123',
    loyaltyPoints: 150
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-0124',
    loyaltyPoints: 320
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '555-0125',
    loyaltyPoints: 75
  }
]

export function CustomerSelect({ customer, onSelect, onClose }: CustomerSelectProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const filteredCustomers = mockCustomers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone?.includes(searchQuery)
  )

  const handleCreateCustomer = () => {
    if (newCustomer.name.trim()) {
      const created: Customer = {
        id: crypto.randomUUID(),
        name: newCustomer.name.trim(),
        email: newCustomer.email.trim() || undefined,
        phone: newCustomer.phone.trim() || undefined,
        loyaltyPoints: 0
      }
      onSelect(created)
      onClose()
    }
  }

  const handleRemoveCustomer = () => {
    onSelect(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select Customer</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {customer && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Current Customer</p>
                <p className="text-sm text-blue-700">{customer.name}</p>
              </div>
              <button
                onClick={handleRemoveCustomer}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Customer List or New Customer Form */}
        <div className="flex-1 overflow-y-auto">
          {showNewCustomerForm ? (
            <div className="p-4 space-y-4">
              <h4 className="font-medium">New Customer</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone (optional)"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleCreateCustomer}
                  disabled={!newCustomer.name.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Customer
                </button>
                <button
                  onClick={() => setShowNewCustomerForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {filteredCustomers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No customers found</p>
                  <p className="text-sm mt-1">Create a new customer to get started</p>
                </div>
              ) : (
                filteredCustomers.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      onSelect(c)
                      onClose()
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{c.name}</h4>
                        {c.email && (
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {c.email}
                          </div>
                        )}
                        {c.phone && (
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {c.phone}
                          </div>
                        )}
                      </div>
                      {c.loyaltyPoints && (
                        <div className="flex items-center text-sm text-amber-600">
                          <Star className="h-3 w-3 mr-1" />
                          {c.loyaltyPoints}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!showNewCustomerForm && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setShowNewCustomerForm(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Customer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}