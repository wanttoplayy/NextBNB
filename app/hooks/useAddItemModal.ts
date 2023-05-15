import { create } from "zustand";

interface AddItemModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddItemModal = create<AddItemModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddItemModal;
