import React from "react";
import { useModalStore } from "@/store/modalStore";
import { Dialog } from "@/components/ui/dialog";

export const Modal: React.FC = () => {
  const { isOpen, dialogContent, closeModal } = useModalStore();

  if (!isOpen || !dialogContent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      {dialogContent}
    </Dialog>
  );
};
