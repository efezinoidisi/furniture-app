"use client";

import { deleteAddress } from "@/lib/actions/user";
import { useTransition } from "react";
import Modal from "./modal-wrapper";

type DeleteModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  action?: () => void;
  id: string;
};

export default function DeleteAddressModal({
  isOpen,
  closeModal,
  id,
}: DeleteModalProps) {
  const [pending, startTransition] = useTransition();

  const handleAddressDeletion = () => {
    startTransition(async () => {
      await deleteAddress(id);
      closeModal();
    });
  };

  return (
    <Modal isOpen={isOpen} handleModalClose={closeModal} className="">
      <h3 className="capitalize text-2xl font-semibold">delete address</h3>
      <p className="text-lg">are you sure?</p>
      <div className="text-right space-x-3">
        <button
          type="button"
          onClick={closeModal}
          className="w-fit bg-red-600 px-2 py-2 text-white capitalize rounded"
        >
          cancel
        </button>
        <button
          type="button"
          onClick={handleAddressDeletion}
          className="w-fit bg-lime-700 px-2 py-2 text-white capitalize rounded"
        >
          {pending ? "deleting.." : "proceed"}
        </button>
      </div>
    </Modal>
  );
}
