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
  discountPercent: number | null;
  image: string;
  status: string;
  slug: string;
  totalQuantity: number;

  variants: {
    id: string;
    color: string;
    images: string[];
    attributes: {
      size: string;
      stock: number;
      price?: number;
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
      fetchDetailedItems: async () => {
        try {
          const { items } = get();
          const { data } = await AxiosBase.post('/api/store/cart', { items });
          const detailedData: DetailedCartItem[] = data.data;

          set({ detailedItems: detailedData });
        } catch (error) {
          console.error('Error fetching detailed items:', error);
        }
      },
      addItem: async (item) => {
        const { items } = get();
        const { fetchDetailedItems } = get();

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
          console.log(newQuantity, 'new quantity')
          set({
            items: items.map((i) =>
              i.productId + i.variantId + i.attributeId === i.productId + i.variantId + existingItem.attributeId ? { ...i, quantity: newQuantity } : i
            ),
          });
        } else {
          // Add new item
          set({ items: [...items, item] });
        }

        // Fetch detailed items for the updated cart asynchronously
        // try {
        //   const updatedItems = [...items, item];
        //   const { data } = await AxiosBase.post('/api/store/cart', { items: updatedItems });
        //   const detailedData: DetailedCartItem[] = data.data;
        //   set({ detailedItems: detailedData });
        // } catch (error) {
        //   console.error('Error fetching detailed items:', error);
        // }
        fetchDetailedItems()
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => `${i.productId}-${i.variantId}-${i.attributeId}` !== productId),
          detailedItems: state.detailedItems.filter((i) => {
            return `${i.id}-${i.variants[0]?.id}-${i.variants[0]?.attributes[0]?.id}` !== productId
          }),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            `${i.productId}-${i.variantId}-${i.attributeId}` === productId ? { ...i, quantity } : i
          ),
        })),
      clearCart: () => set({ items: [], detailedItems: [] }),

    }),
    {
      name: 'cart-storage', // Key for local storage
    }
  )
);

