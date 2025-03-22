import { create } from "zustand";
import { ReactNode } from "react";

type ModalState = {
  isOpen: boolean;
  dialogContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  dialogContent: null,
  openModal: (content) => set({ isOpen: true, dialogContent: content }),
  closeModal: () => set({ isOpen: false, dialogContent: null }),
}));
