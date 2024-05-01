"use client";
import { Icons } from "@/lib/icons";
import { mergeStyles } from "@/utils/style-helpers";
import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

const inputVariants = cva("flex flex-col gap-1 py-1 relative", {
  variants: {
    variant: {
      default: "",
      bottom: "",
      full: "",
    },
    size: {
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type FormFieldProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants> & {
      error: FieldError | undefined;
      register: UseFormRegister<T>;
      fieldName: Path<T>;
      label?: string;
    };

export default function FormField<T extends FieldValues>({
  type = "text",
  fieldName,
  error,
  register,
  label = "",
  id,
  className,
  variant,
  size,
  ...otherProps
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  let inputType = showPassword ? "text" : type;
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={mergeStyles(inputVariants({ variant, size, className }))}>
      {label ? (
        <label htmlFor={id} className="capitalize font-semibold">
          {label}
        </label>
      ) : null}
      <input
        type={inputType}
        {...register(fieldName)}
        id={id}
        {...otherProps}
        className="w-full h-full invalid:border-pink-500 focus-within:border-blue-500/50 focus-within:shadow-lg py-4 pl-4 pr-7 focus-within:outline-none border border-black/20 rounded-lg"
        aria-invalid={!!error}
      />
      {type === "password" ? (
        <button
          type="button"
          onClick={toggleShowPassword}
          id={`toggle-${id}-view`}
          aria-label="password visibility"
          className="absolute top-1/2 -translate-y-1/2 right-2 text-grey-100/80"
        >
          {!showPassword ? (
            <Icons.eyeClose size={20} />
          ) : (
            <Icons.eyeOpen size={20} />
          )}
        </button>
      ) : null}
      {error ? (
        <span className="text-pink-500 text-sm" role="alert">
          {error.message}
        </span>
      ) : null}
    </div>
  );
}
