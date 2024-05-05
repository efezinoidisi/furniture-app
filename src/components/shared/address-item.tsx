"use client";
import { Address } from "@/types/shipping";
import Link from "next/link";
import { useState } from "react";
import DeleteAddressModal from "../modals/delete-modal";

export default function AddressItem({
  full_name,
  apartment,
  street,
  state,
  city,
  country,
  id,
  phone_number,
}: Address) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  return (
    <>
      <p className="capitalize font-semibold text-lg">{full_name}</p>
      <p>{`${street}, ${apartment}, ${city}, ${state}, ${country}`}</p>
      <p className="my-1">{phone_number}</p>

      <Link
        href={`/address/${id}/edit`}
        className="text-green capitalize hover:scale-105 inline-block transition-all  ease-linear"
      >
        edit
      </Link>
      <button
        type="button"
        onClick={openDeleteModal}
        className="ml-5 capitalize text-red-600 hover:scale-105 transition-all  ease-linear"
      >
        delete
      </button>

      <DeleteAddressModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        id={id}
      />
    </>
  );
}
