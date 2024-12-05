import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  name: string;
  id: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  image: string;
  status: string;
  variantId?: string;
  attributeId?: string;
  slug: string;
  maxStock: number;
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
            const newQuantity = Math.min(
              existingItem.quantity + item.quantity,
              existingItem.maxStock
            );
            return {
              items: state.items.map((i) =>
                i === existingItem
                  ? { ...i, quantity: newQuantity }
                  : i
              ),
            };
          }

          // Ensure the initial quantity does not exceed maxStock
          const initialQuantity = Math.min(item.quantity, item.maxStock);

          return { items: [...state.items, { ...item, quantity: initialQuantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.min(quantity, item.maxStock) }
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
