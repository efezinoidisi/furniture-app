"use client";
import { useCartStore } from "@/providers/cart-store-provider";
import { mergeStyles } from "@/utils/style-helpers";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { shippingDetailsAction } from "../../app/checkout/action";
import DefaultButton from "../buttons/default-button";

export default function ShippingDetails() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(shippingDetailsAction, null);
  console.log(pending);
  const cardRef = useRef<HTMLInputElement | null>(null);

  const cart = useCartStore((state) => state.cart);
  if (!cart || cart.length === 0) {
    return (
      <div className='col-span-full min-h-[50vh] flex flex-col items-center gap-6 capitalize justify-center relative after:content-[""] after:absolute after:top-1/2 after:w-40 after:h-32 after:bg-spot-gradient after:blur-3xl after:rounded-full after:-left-32'>
        <p>your cart is currently empty</p>
        <Link
          href={"/products"}
          className="rounded-md bg-black/90 text-nowrap py-2 px-4 w-fit text-primary link hover:bg-primary/90 hover:text-white"
        >
          go shopping
        </Link>
      </div>
    );
  }

  const fieldItems = getFieldList();

  return (
    <form className="md: w-full flex flex-col gap-y-6" action={formAction}>
      <div className="">
        {/* {state?.error.message && <p>{state.error.message}</p>} */}
      </div>

      {fieldItems.map((field) => (
        <div className="flex flex-col gap-1 py-1" key={field.id}>
          <label htmlFor={field.id} className="capitalize font-semibold">
            {field.label}
          </label>

          <input
            type={field.type || "text"}
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            className="w-full h-full invalid:border-pink-500 focus-within:border-blue-500/50 focus-within:shadow-lg py-3 px-2 focus-within:outline-none border border-black/20 rounded-lg"
            aria-invalid={!!state?.errors[field.id]}
          />
          {state?.errors[field.id] ? (
            <span className="text-pink-500 text-sm" role="alert">
              {state.errors[field.id]?.toString()}
            </span>
          ) : null}
        </div>
      ))}
      <div>
        <p className="capitalize font-semibold">card type</p>
        <div className="flex items-center gap-3">
          {paymentGateways.map(({ img, value }) => {
            const active = cardRef.current?.value === value;
            return (
              <DefaultButton
                key={value}
                className={mergeStyles(
                  "h-full hover:border hover:border-primary/40 px-3     ",
                  active && "border border-primary/60"
                )}
              >
                <Image
                  src={img}
                  alt={value}
                  width={500}
                  height={500}
                  unoptimized
                  className={`w-14`}
                  onClick={() => {
                    if (cardRef.current) {
                      cardRef.current.value = value;
                    }
                  }}
                />
              </DefaultButton>
            );
          })}

          <input
            type="text"
            className="hidden"
            ref={cardRef}
            id="card-type"
            name="card-type"
          />
        </div>
        {state?.errors.card ? (
          <span className="text-pink-500 text-sm" role="alert">
            {state.errors.card[0]}
          </span>
        ) : null}
      </div>
      <label className="flex gap-1 items-center">
        <input type="checkbox" id="cash-on-delivery" name="cash-on-delivery" />
        cash on delivery
      </label>
      <DefaultButton
        type="submit"
        aria-disabled={pending}
        className="capitalize disabled:bg-gray-500 disabled:pointer-events-none bg-black/95 rounded-md text-white py-3"
      >
        proceed with order
      </DefaultButton>
    </form>
  );
}

const getFieldList = (): {
  id:
    | "full_name"
    | "address"
    | "state"
    | "country"
    | "city"
    | "phone_number"
    | "card"
    | "cash_on_delivery"
    | "apartment";
  placeholder?: string;
  label: string;
  type?: string;
  required?: boolean;
}[] => {
  return [
    {
      id: "full_name",
      placeholder: "John Doe",
      label: "full name",
    },
    {
      id: "address",
      placeholder: "23 bole avenue",
      label: "street address",
      required: true,
    },
    {
      id: "apartment",
      placeholder: "peak house, 2nd floor,room 2",
      label: "apartment,floor,e.t.c(optional)",
    },
    {
      id: "country",
      placeholder: "Nigeria",
      label: "country",
      required: true,
    },
    {
      id: "state",
      placeholder: "Lagos",
      label: "state",
      required: true,
    },
    {
      id: "city",
      placeholder: "Ikeja | Atlanta",
      label: "town/city",
      required: true,
    },
    {
      id: "phone_number",
      placeholder: "+234900000000",
      label: "phone number",
      required: true,
    },
  ];
};

type LabelledInputProps = {
  label: string;
  type?: string;
  id: string;
  placeholder: string;
};
const LabelledInput = ({
  label,
  id,
  placeholder,
  type = "text",
}: LabelledInputProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id} className="font-medium capitalize text-base">
        {label}
      </label>
      <input
        name={id}
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full border border-black/30 py-3 focus-within:outline-none focus:border-primary/70 focus:shadow-lg px-3 placeholder:capitalize rounded-xl"
      />
    </div>
  );
};

const paymentGateways = [
  {
    value: "visa",
    img: "/assets/icons/visa-credit-card.svg",
  },
  {
    value: "verve",
    img: "/assets/icons/Verve-logo.svg",
  },
  {
    value: "mastercard",
    img: "/assets/icons/mastercard.svg",
  },
];
