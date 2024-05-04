"use client";

import Image from "next/image";
import Link from "next/link";
import Modal from "./modal-wrapper";

type SuccessModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  action?: () => void;
  title: string;
  img: string;
  href: string;
};

export default function SuccessModal({
  isOpen,
  closeModal,
  title,
  img,
  href,
}: SuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      handleModalClose={closeModal}
      className=""
      showCloseButton={false}
    >
      <h3 className="capitalize text-2xl md:text-4xl font-semibold text-center">
        {title}
      </h3>
      <Image
        src={img}
        alt=""
        width={500}
        height={500}
        className="w-full max-w-sm mx-auto"
      />
      <div className="text-right space-x-3">
        <Link
          href={href}
          onClick={closeModal}
          className="w-fit bg-green min-w-20 inline-block text-center py-2 text-white capitalize rounded text-xl hover:opacity-70 transition-all ease-linear"
        >
          ok
        </Link>
      </div>
    </Modal>
  );
}
