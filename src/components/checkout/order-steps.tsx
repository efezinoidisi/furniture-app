"use client";

import { paymentAction, selectAddressAction } from "@/lib/actions/user";
import { Icons } from "@/lib/icons";
import type { Address } from "@/types/shipping";
import { mergeStyles } from "@/utils/style-helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/submit-button";
import DeleteAddressModal from "../modals/delete-modal";

// address selection
export function StepOne({
  addresses,
  nextStep,
  total,
}: {
  addresses: Array<Address>;
  nextStep: () => void;
  total: number;
}) {
  const [state, dispatch] = useFormState(selectAddressAction, undefined);

  useEffect(() => {
    if (state) {
      if (state.status === "error") {
        toast.error(state.message);
      } else {
        // toast.success("done!");
        nextStep();
      }
    }
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col gap-y-7">
      <div className="border-b-2 border-gray-300 pb-10">
        {addresses.length === 0 ? (
          <p className="text-center">no shipping address yet</p>
        ) : (
          addresses.map((address) => <Address key={address.id} {...address} />)
        )}
      </div>

      <input
        type="text"
        name="total_price"
        id="total_price"
        value={`${total}`}
        placeholder="total price"
        className="hidden"
        readOnly
      />
      <Link
        href={"/address/new"}
        className="flex items-center gap-2 text-primary font-semibold text-lg w-fit"
      >
        <Icons.plus size={30} />
        <span>Add new address</span>
      </Link>

      <SubmitButton title="proceed" className="bg-accent rounded py-3" />
    </form>
  );
}

function Address({
  id,
  apartment,
  state,
  street,
  city,
  country,
  full_name,
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
      <div className="flex gap-2 items-start justify-start">
        <input
          type="radio"
          name={"address"}
          id={id}
          value={id}
          className="size-6"
        />

        <label htmlFor={id} className="border shadow-md px-2   pb-2">
          <p className="capitalize font-semibold text-lg">{full_name}</p>
          <p>{`${street}, ${apartment}, ${city}, ${state}, ${country}`}</p>
          <p className="my-1">{phone_number}</p>

          <Link href={`/address/${id}/edit`} className="text-green capitalize">
            edit
          </Link>
          <button
            type="button"
            onClick={openDeleteModal}
            className="ml-5 capitalize text-red-600"
          >
            delete
          </button>
        </label>
      </div>

      <DeleteAddressModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        id={id}
      />
    </>
  );
}

// payment method selection
export function StepTwo({
  nextStep,
  total,
}: {
  nextStep: () => void;
  total: number;
}) {
  const [active, setActive] = useState("");

  const paymentMethods: Array<{
    title: "Pay on Delivery";
    redirect?: string;
  }> = [
    {
      title: "Pay on Delivery",
    },
  ];

  const [state, dispatch] = useFormState(paymentAction, undefined);

  useEffect(() => {
    if (state) {
      if (state.status === "error") {
        toast.error(state.message);
      } else {
        toast.success("order completed!");
        nextStep();
      }
    }
  }, [state]);

  const handleClick = (value: string) => {
    setActive(value);
  };

  return (
    <form action={dispatch} className="flex flex-col gap-y-7">
      <h2 className="font-semibold capitalize text-xl text-charcoal">
        payment options
      </h2>
      <div className="self-center ">
        {paymentMethods.map((method) => {
          const isActive = active === method.title;
          return (
            <label
              key={method.title}
              className={mergeStyles(
                "flex items-center gap-5 rounded-md py-2 border px-8 w-full",
                isActive && "border-primary"
              )}
              onClick={() => handleClick(method.title)}
            >
              {method.title}
              <input
                type="radio"
                name={"method"}
                id={method.title}
                value={method.title}
                className="hidden"
                readOnly
              />

              {isActive ? <Icons.check /> : null}
            </label>
          );
        })}

        <input
          type="text"
          name="amount"
          id="amount"
          readOnly
          placeholder="amount"
          value={`${total}`}
          className="hidden"
        />
      </div>

      <SubmitButton
        title="proceed"
        className="py-3 w-fit bg-green px-8 text-lg"
      />
    </form>
  );
}

export function StepThree() {
  return <>success</>;
}
