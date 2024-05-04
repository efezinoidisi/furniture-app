"use client";
import { useCartStore } from "@/providers/cart-store-provider";
import { Address } from "@/types/shipping";
import { calculateTotals } from "@/utils/helper-functions";
import { mergeStyles } from "@/utils/style-helpers";
import Link from "next/link";
import { useState } from "react";
import { StepOne, StepThree, StepTwo } from "./order-steps";

type Props = {
  addresses: Array<Address>;
};

export default function ShippingDetails({ addresses }: Props) {
  const { cart, clearCart } = useCartStore((state) => state);

  const [step, setStep] = useState(0);

  const { total } = calculateTotals(cart);

  const nextStep = () => {
    if (step >= 2) return;
    setStep((prev) => prev + 1);
  };

  const forms = [
    <StepOne
      addresses={addresses}
      key={"address"}
      nextStep={nextStep}
      total={total}
    />,
    <StepTwo key={"payment method"} nextStep={nextStep} total={total} />,
    <StepThree key={"success"} clearCart={clearCart} />,
  ];

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

  return (
    <section>
      <ul className="flex items-center gap-3 justify-start mb-4">
        {formSteps.map((value, index) => {
          const isActive = index === step;

          return (
            <li
              key={value}
              className={mergeStyles(
                "group opacity-90",
                isActive ? "text-primary" : "text-charcoal"
              )}
            >
              {value}
              <span className="group-last:hidden ml-3 text-charcoal">
                {">"}
              </span>
            </li>
          );
        })}
      </ul>
      {forms[step]}
    </section>
  );
}

const formSteps = ["shipping", "payment"];
