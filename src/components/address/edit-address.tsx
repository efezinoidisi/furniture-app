"use client";

import { addressFields } from "@/constants/data";
import { updateAddress } from "@/lib/actions/user";
import { BillingInfoSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FieldPath, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import SubmitButton from "../buttons/submit-button";
import FormField from "../shared/form-field";

type FormValues = z.infer<typeof BillingInfoSchema>;

type EditShippingAddressProps = {
  initialValues: FormValues;
  id: string;
};

export default function EditShippingAddress({
  initialValues,
  id,
}: EditShippingAddressProps) {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormValues>({
    resolver: zodResolver(BillingInfoSchema),
    defaultValues: initialValues,
  });

  const [state, dispatch] = useFormState(
    updateAddress.bind(null, id),
    undefined
  );

  useEffect(() => {
    if (!state) return;

    if (state.status === "error") {
      clearErrors();
      toast.error(state.message, {
        duration: 5000,
      });
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<FormValues>, {
          message: error.message,
        });
      });
    }
  }, [state, setError, clearErrors]);

  return (
    <form
      className="w-5/6 mx-auto md:w-1/2 flex flex-col gap-3 max-w-md"
      action={dispatch}
    >
      {addressFields.map((field) => (
        <FormField
          key={field.id}
          fieldName={field.id}
          register={register}
          error={errors[field.id]}
          placeholder={field.placeholder}
          type={"text"}
          label={field.label}
        />
      ))}

      <SubmitButton
        title="update address"
        className="bg-accent text-white rounded py-3"
      />
    </form>
  );
}
