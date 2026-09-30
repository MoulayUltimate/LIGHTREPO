import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./products"

// One licence is sold per customer, so a line can never hold more than one.
const MAX_QUANTITY_PER_ITEM = 1

interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id)
          // One licence per customer: re-adding is a no-op rather than a bump.
          if (existingItem) return state
          return { items: [...state.items, { product, quantity: MAX_QUANTITY_PER_ITEM }] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        const capped = Math.min(quantity, MAX_QUANTITY_PER_ITEM)
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity: capped } : item,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },
    }),
    {
      name: "lightburn-cart",
      // Carts saved before the one-per-customer cap may hold a larger
      // quantity, so clamp whatever comes back out of storage.
      merge: (persisted, current) => {
        const saved = persisted as Partial<CartStore> | undefined
        return {
          ...current,
          ...saved,
          items: (saved?.items ?? []).map((item) => ({
            ...item,
            quantity: Math.min(item.quantity, MAX_QUANTITY_PER_ITEM),
          })),
        }
      },
    },
  ),
)
