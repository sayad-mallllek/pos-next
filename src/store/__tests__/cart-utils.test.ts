import { describe, it, expect } from 'vitest'
import { getSubtotal, getTax, getTotal, getAmountPaid, getBalanceDue } from '../../lib/utils'

describe('Cart Utility Functions', () => {
  const mockItems = [
    {
      id: '1',
      productId: '1',
      name: 'Product 1',
      price: 10.00,
      quantity: 2,
      discount: null,
      notes: '',
    },
    {
      id: '2',
      productId: '2',
      name: 'Product 2',
      price: 20.00,
      quantity: 1,
      discount: { type: 'percentage' as const, value: 10 },
      notes: '',
    },
    {
      id: '3',
      productId: '3',
      name: 'Product 3',
      price: 5.00,
      quantity: 3,
      discount: { type: 'fixed' as const, value: 2.00 },
      notes: '',
    },
  ]

  describe('getSubtotal', () => {
    it('should calculate subtotal correctly', () => {
      const expected = (10.00 * 2) + (20.00 * 1 * 0.9) + ((5.00 * 3) - 2.00)
      expect(getSubtotal(mockItems)).toBe(expected)
    })

    it('should return 0 for empty items', () => {
      expect(getSubtotal([])).toBe(0)
    })
  })

  describe('getTax', () => {
    it('should calculate tax correctly', () => {
      expect(getTax(100, 0.08)).toBe(8)
      expect(getTax(50, 0.10)).toBe(5)
    })

    it('should use default tax rate', () => {
      expect(getTax(100)).toBe(8)
    })
  })

  describe('getTotal', () => {
    it('should calculate total with cart discount', () => {
      const cartDiscount = { type: 'percentage' as const, value: 10 }
      const subtotal = getSubtotal(mockItems)
      const expectedTotal = (subtotal * 0.9) + getTax(subtotal * 0.9)
      
      expect(getTotal(mockItems, cartDiscount)).toBe(expectedTotal)
    })

    it('should calculate total with fixed cart discount', () => {
      const cartDiscount = { type: 'fixed' as const, value: 5 }
      const subtotal = getSubtotal(mockItems)
      const expectedTotal = (subtotal - 5) + getTax(subtotal - 5)
      
      expect(getTotal(mockItems, cartDiscount)).toBe(expectedTotal)
    })
  })

  describe('getAmountPaid', () => {
    it('should sum all payments', () => {
      const payments = [
        { id: '1', type: 'cash' as const, amount: 20.00 },
        { id: '2', type: 'card' as const, amount: 30.00 },
        { id: '3', type: 'gift_card' as const, amount: 10.00 },
      ]

      expect(getAmountPaid(payments)).toBe(60.00)
    })

    it('should return 0 for no payments', () => {
      expect(getAmountPaid([])).toBe(0)
    })
  })

  describe('getBalanceDue', () => {
    it('should calculate balance due', () => {
      const payments = [
        { id: '1', type: 'cash' as const, amount: 20.00 },
        { id: '2', type: 'card' as const, amount: 30.00 },
      ]

      expect(getBalanceDue(60.00, payments)).toBe(10.00)
    })

    it('should handle overpayment (change)', () => {
      const payments = [
        { id: '1', type: 'cash' as const, amount: 50.00 },
      ]

      expect(getBalanceDue(30.00, payments)).toBe(-20.00)
    })
  })
})