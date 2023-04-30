

import { create } from "zustand";

interface AddItemModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddItemModal= create<AddItemModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useAddItemModal;