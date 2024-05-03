"use client";

import { Icons } from "@/lib/icons";
import { mergeStyles } from "@/utils/style-helpers";
import { ReactNode, useEffect, useRef } from "react";

type ModalWrapperProps = {
  isOpen: boolean;
  children: ReactNode;
  handleModalClose: () => void;
  className?: string;
};

export default function Modal({
  isOpen,
  children,
  handleModalClose,
  className = "",
}: ModalWrapperProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    if (isOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      onCancel={handleModalClose}
      className={mergeStyles(
        "modal w-3/4 md:w-1/2 py-10 px-5 rounded-md space-y-4",
        className
      )}
    >
      <button
        type="button"
        onClick={handleModalClose}
        className="text-red-600 absolute top-2 right-2"
        aria-label="close modal"
      >
        <Icons.close size={30} />
      </button>
      {children}
    </dialog>
  );
}
