import { Variant } from "@/types/product";
import { create } from "zustand";

interface SelectModalProps {
    variants: Variant[]; // Array of selected variants
    isOpen: boolean;
    product: productDetails; // Total price of selected variants
    addVariants: (variantArray: Variant[]) => void; // Accepts an array of variants
    removeVariant: (variantId: string) => void;
    setProduct: (product: productDetails) => void; // Directly set the price from a product card
    clearVariants: () => void;
    onOpen: () => void;
    onClose: () => void;
};

type productDetails = {
    name: string;
    status: string;
    price: number; //
}

const useSelectVariantController = create<SelectModalProps>((set) => ({
    variants: [],
    isOpen: false,
    product: null,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    addVariants: (variantArray) =>
        set(() => ({
            variants: [...variantArray],
        })),
    removeVariant: (variantId) =>
        set((state) => ({
            variants: state.variants.filter((variant) => variant.id !== variantId),
        })),
    setProduct: (product) => set({ product }), // Directly updates the price
    clearVariants: () => set({ variants: [] }),
}));

export default useSelectVariantController;
