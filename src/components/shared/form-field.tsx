import { mergeStyles } from '@/utils/style-helpers';
import { InputHTMLAttributes } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva('flex flex-col gap-1 py-1', {
  variants: {
    variant: {
      default: '',
      bottom: '',
      full: '',
    },
    size: {
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
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
  type = 'text',
  fieldName,
  error,
  register,
  label = '',
  id,
  className,
  variant,
  size,
  ...otherProps
}: FormFieldProps<T>) {
  return (
    <div className={mergeStyles(inputVariants({ variant, size, className }))}>
      {label ? (
        <label htmlFor={id} className='capitalize font-semibold'>
          {label}
        </label>
      ) : null}
      <input
        type={type}
        {...register(fieldName)}
        id={id}
        {...otherProps}
        className='w-full h-full invalid:border-pink-500 focus-within:border-blue-500/50 focus-within:shadow-lg py-3 px-2 focus-within:outline-none border border-black/20 rounded-lg placeholder:capitalize'
        aria-invalid={!!error}
      />
      {error ? (
        <span className='text-pink-500 text-sm' role='alert'>
          {error.message}
        </span>
      ) : null}
    </div>
  );
}
