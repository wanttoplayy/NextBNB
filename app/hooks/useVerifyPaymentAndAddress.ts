

import { create } from "zustand";

interface VerifyPaymentAndAddressModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useVerifyPaymentAndAddressModal= create<VerifyPaymentAndAddressModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useVerifyPaymentAndAddressModal;