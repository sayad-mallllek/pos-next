'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Package, Eye } from 'lucide-react'
import { productService, Product } from '@/services/productService'
import { getStockStatus } from '@/lib/utils'
import { debounce } from '@/lib/utils'

interface ProductSearchProps {
  onProductSelect: (product: Product) => void
  className?: string
}

export function ProductSearch({ onProductSelect, className }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const debouncedSearch = useMemo(
    () => debounce(async (query: string) => {
      setLoading(true)
      try {
        const results = await productService.searchProducts(query)
        setProducts(results)
        setSelectedIndex(-1)
      } catch (error) {
        console.error('Error searching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(searchQuery)
  }, [searchQuery, debouncedSearch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < products.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      onProductSelect(products[selectedIndex])
      setSearchQuery('')
      setProducts([])
      setSelectedIndex(-1)
    } else if (e.key === 'Escape') {
      setSearchQuery('')
      setProducts([])
      setSelectedIndex(-1)
    }
  }

  const handleProductClick = (product: Product) => {
    onProductSelect(product)
    setSearchQuery('')
    setProducts([])
    setSelectedIndex(-1)
  }

  return (
    <div className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {products.length > 0 && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {products.map((product, index) => {
            const stockStatus = getStockStatus(product.stock)
            return (
              <div
                key={product.id}
                className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                  index === selectedIndex 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'hover:bg-gray-50'
                } ${stockStatus.status === 'out-of-stock' ? 'opacity-50' : ''}`}
                onClick={() => handleProductClick(product)}
              >
                <div className="flex items-start space-x-3">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-gray-400" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-sm font-semibold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-500">
                            SKU: {product.sku}
                          </span>
                        </div>
                      </div>
                      <Eye className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                    </div>

                    {/* Stock Status */}
                    <div className="mt-2">
                      <span className={`text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* No Results */}
      {!loading && searchQuery && products.length === 0 && (
        <div className="mt-2 p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
          <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No products found</p>
          <p className="text-xs mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  )
}