import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPercentage, debounce, truncateText, getStockStatus } from '../utils'

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(0)).toBe('$0.00')
      expect(formatCurrency(10)).toBe('$10.00')
      expect(formatCurrency(10.5)).toBe('$10.50')
      expect(formatCurrency(10.99)).toBe('$10.99')
      expect(formatCurrency(1000.99)).toBe('$1,000.99')
    })

    it('should handle negative numbers', () => {
      expect(formatCurrency(-10.50)).toBe('-$10.50')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(formatPercentage(0)).toBe('0%')
      expect(formatPercentage(10)).toBe('10%')
      expect(formatPercentage(10.5)).toBe('10.5%')
      expect(formatPercentage(100)).toBe('100%')
    })

    it('should handle decimal places correctly', () => {
      expect(formatPercentage(10.25)).toBe('10.25%')
      expect(formatPercentage(10.333)).toBe('10.33%')
    })
  })

  describe('debounce', () => {
    it('should delay function execution', (done) => {
      let callCount = 0
      const mockFn = () => {
        callCount++
      }
      
      const debouncedFn = debounce(mockFn, 100)
      
      // Call multiple times quickly
      debouncedFn()
      debouncedFn()
      debouncedFn()
      
      // Should not have been called yet
      expect(callCount).toBe(0)
      
      // Wait for debounce timeout
      setTimeout(() => {
        expect(callCount).toBe(1)
        done()
      }, 150)
    })

    it('should reset timer on subsequent calls', (done) => {
      let callCount = 0
      const mockFn = () => {
        callCount++
      }
      
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn()
      
      // Call again before timeout
      setTimeout(() => {
        debouncedFn()
      }, 50)
      
      // Should still not have been called
      setTimeout(() => {
        expect(callCount).toBe(0)
      }, 80)
      
      // Should be called after full timeout from last call
      setTimeout(() => {
        expect(callCount).toBe(1)
        done()
      }, 200)
    })
  })

  describe('truncateText', () => {
    it('should truncate text longer than maxLength', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...')
      expect(truncateText('This is a long text', 10)).toBe('This is a ...')
    })

    it('should not truncate text shorter than maxLength', () => {
      expect(truncateText('Hello', 10)).toBe('Hello')
      expect(truncateText('', 5)).toBe('')
    })

    it('should handle exact length', () => {
      expect(truncateText('Hello', 5)).toBe('Hello')
    })
  })

  describe('getStockStatus', () => {
    it('should return out-of-stock for zero stock', () => {
      const result = getStockStatus(0)
      expect(result.status).toBe('out-of-stock')
      expect(result.color).toBe('text-red-600')
      expect(result.text).toBe('Out of Stock')
    })

    it('should return low-stock for stock less than 10', () => {
      const result = getStockStatus(5)
      expect(result.status).toBe('low-stock')
      expect(result.color).toBe('text-yellow-600')
      expect(result.text).toBe('Low Stock (5)')
    })

    it('should return in-stock for stock 10 or more', () => {
      const result = getStockStatus(15)
      expect(result.status).toBe('in-stock')
      expect(result.color).toBe('text-green-600')
      expect(result.text).toBe('In Stock (15)')
    })

    it('should handle edge case of exactly 10', () => {
      const result = getStockStatus(10)
      expect(result.status).toBe('in-stock')
      expect(result.color).toBe('text-green-600')
      expect(result.text).toBe('In Stock (10)')
    })
  })
})