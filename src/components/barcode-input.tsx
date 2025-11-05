'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Barcode } from 'lucide-react'
import { productService, Product } from '@/services/productService'
import { cn } from '@/lib/utils'

interface BarcodeInputProps {
  onProductFound: (product: Product) => void
  onError?: (error: string) => void
  className?: string
}

export function BarcodeInput({ onProductFound, onError, className }: BarcodeInputProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [barcodeBuffer, setBarcodeBuffer] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // barcode scanners typically send key events rapidly and end with Enter
      if (event.key === 'Enter' && barcodeBuffer.length > 0) {
        processBarcode(barcodeBuffer)
        setBarcodeBuffer('')
        return
      }

      // If we're not actively scanning and get rapid input, start scanning
      if (!isScanning && event.key.length === 1) {
        setIsScanning(true)
        setShowOverlay(true)
        setBarcodeBuffer(event.key)
        
        // Clear buffer after 2 seconds of inactivity
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setBarcodeBuffer('')
          setIsScanning(false)
          setShowOverlay(false)
        }, 2000)
        return
      }

      // Continue building barcode buffer
      if (isScanning && event.key.length === 1) {
        setBarcodeBuffer(prev => prev + event.key)
        
        // Reset timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setBarcodeBuffer('')
          setIsScanning(false)
          setShowOverlay(false)
        }, 2000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [barcodeBuffer, isScanning])

  const processBarcode = async (barcode: string) => {
    try {
      const product = await productService.getProductByBarcode(barcode)
      if (product) {
        onProductFound(product)
        setShowOverlay(false)
        setIsScanning(false)
      } else {
        onError?.(`Product not found for barcode: ${barcode}`)
        setShowOverlay(false)
        setIsScanning(false)
      }
    } catch (error) {
      onError?.('Error scanning barcode')
      setShowOverlay(false)
      setIsScanning(false)
    }
  }

  const handleManualBarcode = async (barcode: string) => {
    if (barcode.trim()) {
      await processBarcode(barcode.trim())
    }
  }

  return (
    <>
      <div className={cn('relative', className)}>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Scan barcode or type SKU..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  await handleManualBarcode((e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
          </div>
          <button
            onClick={() => setShowOverlay(true)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            title="Start barcode scanning"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Barcode Scanning Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Scanning Barcode</h3>
              <button
                onClick={() => {
                  setShowOverlay(false)
                  setIsScanning(false)
                  setBarcodeBuffer('')
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Barcode className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Ready to scan
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  Use your barcode scanner or type the barcode manually and press Enter.
                </p>
              </div>

              {barcodeBuffer && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Scanning:</p>
                  <p className="font-mono text-lg">{barcodeBuffer}</p>
                </div>
              )}

              <input
                type="text"
                placeholder="Enter barcode manually..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleManualBarcode((e.target as HTMLInputElement).value)
                    setShowOverlay(false)
                    setIsScanning(false)
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}