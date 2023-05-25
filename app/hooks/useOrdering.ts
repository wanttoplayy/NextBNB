import { create } from "zustand";

interface OrderingModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useOrderingModal = create<OrderingModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useOrderingModal;
