'use client'

import { useState } from 'react'
import { ArrowLeftRight, Package, ShoppingCart, Settings } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { ProductSearch } from '@/components/product-search'
import { BarcodeInput } from '@/components/barcode-input'
import { Cart } from '@/components/cart'
import { productService, Product } from '@/services/productService'

export default function RegisterPage() {
  const { addItem, toggleReturnMode, isReturnMode } = useCartStore()
  const [activeView, setActiveView] = useState<'products' | 'cart'>('products')

  const handleProductSelect = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      discount: null,
      notes: '',
      image: product.image,
    })
  }

  const handleBarcodeProduct = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      discount: null,
      notes: '',
      image: product.image,
    })
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Point of Sale</h1>
            <button
              onClick={toggleReturnMode}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                isReturnMode 
                  ? 'bg-red-100 text-red-700 border border-red-200' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              <ArrowLeftRight className="h-4 w-4 inline mr-1" />
              {isReturnMode ? 'Return Mode' : 'Sale Mode'}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane - Product Search */}
        <div className={`${activeView === 'cart' ? 'hidden lg:flex' : 'flex'} flex-1 flex-col bg-white border-r border-gray-200 max-w-2xl`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold">Products</h2>
            </div>
            
            {/* Barcode Input */}
            <BarcodeInput
              onProductFound={handleBarcodeProduct}
              onError={(error) => console.error('Barcode error:', error)}
            />
          </div>

          {/* Product Search */}
          <div className="flex-1 p-4 overflow-y-auto">
            <ProductSearch onProductSelect={handleProductSelect} />
          </div>
        </div>

        {/* Right Pane - Cart */}
        <div className={`${activeView === 'products' ? 'hidden lg:flex' : 'flex'} flex-1 flex-col bg-white`}>
          <Cart />
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('products')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'products'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Package className="h-4 w-4 inline mr-1" />
            Products
          </button>
          <button
            onClick={() => setActiveView('cart')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'cart'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <ShoppingCart className="h-4 w-4 inline mr-1" />
            Cart
          </button>
        </div>
      </div>
    </div>
  )
}