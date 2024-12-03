import { create } from 'zustand';

interface cartHookProps {
    isOpenBottomSlide: boolean;
    isReloadBottomSlide: boolean;
    onOpenBottomSlide: () => void;
    onCloseBottomSlide: () => void;
    onToggleBottomSlide: () => void;
}

const useCartController = create<cartHookProps>((set) => ({
    isOpenBottomSlide: false,
    isReloadBottomSlide: false,
    onOpenBottomSlide: () => set({ isOpenBottomSlide: true }),
    onCloseBottomSlide: () => set({ isOpenBottomSlide: false }),
    onToggleBottomSlide: () => set((state) => ({ isReloadBottomSlide: !state.isReloadBottomSlide })),
}));

export default useCartController;
