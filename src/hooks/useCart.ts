// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface CartItem {
//   name: string;
//   id: string;
//   quantity: number;
//   size?: string;
//   color?: string;
//   price: number;
//   image: string;
//   status: string;
//   variantId?: string;
//   attributeId?: string;
//   slug: string;
//   maxStock: number;
// }

// interface CartStore {
//   items: CartItem[];
//   addItem: (item: CartItem) => void;
//   removeItem: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   clearCart: () => void;
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set) => ({
//       items: [],
//       addItem: (item) =>
//         set((state) => {
//           const existingItem = state.items.find(
//             (i) =>
//               i.size === item.size &&
//               i.color === item.color
//           );

//           if (existingItem) {
//             const newQuantity = Math.min(
//               existingItem.quantity + item.quantity,
//               existingItem.maxStock
//             );
//             return {
//               items: state.items.map((i) =>
//                 i === existingItem
//                   ? { ...i, quantity: newQuantity }
//                   : i
//               ),
//             };
//           }

//           // Ensure the initial quantity does not exceed maxStock
//           const initialQuantity = Math.min(item.quantity, item.maxStock);

//           return { items: [...state.items, { ...item, quantity: initialQuantity }] };
//         }),
//       removeItem: (productId) =>
//         set((state) => ({
//           items: state.items.filter((i) => i.id !== productId),
//         })),
//       updateQuantity: (productId, quantity) =>
//         set((state) => ({
//           items: state.items.map((item) =>
//             item.id === productId
//               ? { ...item, quantity: Math.min(quantity, item.maxStock) }
//               : item
//           ),
//         })),
//       clearCart: () => set({ items: [] }),
//     }),
//     {
//       name: 'cart-storage',
//     }
//   )
// );

import AxiosBase from '@/lib/axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  variantId: string;
  attributeId: string;
  quantity: number;
}

interface DetailedCartItem extends CartItem {
  name: string;
  quantity: number;
  category: {
    name: string;
  };
  id: string;
  price: number;
  discountPercent: number | null; // Can be null based on your data
  image: string; // Single image link from the first variant
  status: string;
  slug: string;
  totalQuantity: number;

  variants: {
    id: string;
    color: string;
    images: string[]; // Array of image URLs
    attributes: {
      size: string;
      stock: number; // Assuming stock is an integer
      price?: number; // Optional attribute price
      id: string;
    }[];
  }[];
}


interface CartStore {
  items: CartItem[];
  detailedItems: DetailedCartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  fetchDetailedItems: () => Promise<void>;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      detailedItems: [],
      addItem: async (item) => {
        const { items } = get();

        // Check if the item already exists in the cart
        const existingItem = items.find(
          (i) =>
            i.productId === item.productId &&
            i.variantId === item.variantId &&
            i.attributeId === item.attributeId
        );

        if (existingItem) {
          // Update quantity if the item exists
          const newQuantity = existingItem.quantity + item.quantity;
          set({
            items: items.map((i) =>
              i === existingItem ? { ...i, quantity: newQuantity } : i
            ),
          });
        } else {
          // Add new item
          set({ items: [...items, item] });
        }

        // Fetch detailed items for the updated cart asynchronously
        try {
          const updatedItems = [...items, item]; // Include the new item
          const { data } = await AxiosBase.post('/api/store/cart', { items: updatedItems });
          const detailedData: DetailedCartItem[] = data.data;
          set({ detailedItems: detailedData });
        } catch (error) {
          console.error('Error fetching detailed items:', error);
        }
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
          detailedItems: state.detailedItems.filter((i) => i.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [], detailedItems: [] }),
      fetchDetailedItems: async () => {
        try {
          const { items } = get();
          const response = await AxiosBase.post('/api/store/cart', { items });
          const detailedData: DetailedCartItem[] = response.data;

          set({ detailedItems: detailedData });
        } catch (error) {
          console.error('Error fetching detailed items:', error);
        }
      },
    }),
    {
      name: 'cart-storage', // Key for local storage
    }
  )
);

