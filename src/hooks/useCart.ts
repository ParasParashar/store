import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface CartItem {
  name: string;
  id: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.size === item.size &&
              i.color === item.color
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i === existingItem
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);