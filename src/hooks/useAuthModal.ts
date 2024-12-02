import { create } from 'zustand';

interface useAuthModalProps {
    isOpen: boolean;
    isReload: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}

const useAuthModal = create<useAuthModalProps>((set) => ({
    isOpen: false,
    isReload: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onToggle: () => set((state) => ({ isReload: !state.isReload })),
}));

export default useAuthModal;
