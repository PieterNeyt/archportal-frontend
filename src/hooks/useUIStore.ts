import {create} from 'zustand';

interface UIState {
    isCartOpen: boolean;
    setCartOpen: (open: boolean) => void;
}

const useInternalStore = create<UIState>(set => ({
    isCartOpen: false,
    setCartOpen: (open) => set({isCartOpen: open}),
}));

export function useUIStore() {
    return useInternalStore();
}