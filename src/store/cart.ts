import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  discount: {
    type: 'percentage' | 'fixed'
    value: number
  } | null
  notes: string
  image?: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  loyaltyPoints?: number
}

export interface Payment {
  id: string
  type: 'cash' | 'card' | 'gift_card'
  amount: number
  reference?: string
}

interface CartState {
  items: CartItem[]
  customer: Customer | null
  payments: Payment[]
  discount: {
    type: 'percentage' | 'fixed'
    value: number
  } | null
  isReturnMode: boolean
  receiptId: string | null
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateDiscount: (id: string, discount: CartItem['discount']) => void
  updateNotes: (id: string, notes: string) => void
  clearCart: () => void
  setCustomer: (customer: Customer | null) => void
  addPayment: (payment: Omit<Payment, 'id'>) => void
  removePayment: (id: string) => void
  setCartDiscount: (discount: CartState['discount']) => void
  toggleReturnMode: () => void
  setReceiptId: (id: string | null) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      customer: null,
      payments: [],
      discount: null,
      isReturnMode: false,
      receiptId: null,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId && i.notes === item.notes
          )
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          
          return {
            items: [
              ...state.items,
              { ...item, id: crypto.randomUUID() },
            ],
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      updateDiscount: (id, discount) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, discount } : item
          ),
        })),

      updateNotes: (id, notes) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, notes } : item
          ),
        })),

      clearCart: () =>
        set({
          items: [],
          customer: null,
          payments: [],
          discount: null,
          receiptId: null,
        }),

      setCustomer: (customer) => set({ customer }),

      addPayment: (payment) =>
        set((state) => ({
          payments: [...state.payments, { ...payment, id: crypto.randomUUID() }],
        })),

      removePayment: (id) =>
        set((state) => ({
          payments: state.payments.filter((p) => p.id !== id),
        })),

      setCartDiscount: (discount) => set({ discount }),

      toggleReturnMode: () =>
        set((state) => ({
          isReturnMode: !state.isReturnMode,
          items: state.items.map((item) => ({
            ...item,
            quantity: state.isReturnMode ? Math.abs(item.quantity) : -item.quantity,
          })),
        })),

      setReceiptId: (receiptId) => set({ receiptId }),
    }),
    {
      name: 'cart-storage',
    }
  )
)