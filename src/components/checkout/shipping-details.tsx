'use client';
import { Icons } from '@/lib/icons';
import DefaultButton from '../buttons/default-button';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BillingInfoSchema } from '@/types/schemas';
import { z } from 'zod';
import {
  FieldError,
  FieldErrors,
  Path,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../shared/form-field';
import { useCartStore } from '../store/cart-store';

type FieldsType = z.infer<typeof BillingInfoSchema>;

export default function ShippingDetails() {
  const initialValues: FieldsType = {
    full_name: '',
    address: '',
    appartment: '',
    city: '',
    phone_number: '',
    email: '',
    cash_on_delivery: false,
    card: '',
  };

  const [formSteps, setFormSteps] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(BillingInfoSchema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    // console.log(data);
  });
  const cart = useCartStore((state) => state.cart);
  if (!cart || cart.length === 0) {
    return (
      <div className='col-span-full min-h-[50vh] flex flex-col items-center gap-6 capitalize justify-center relative after:content-[""] after:absolute after:top-1/2 after:w-40 after:h-32 after:bg-spot-gradient after:blur-3xl after:rounded-full after:-left-32'>
        <p>your cart is currently empty</p>
        <Link
          href={'/products'}
          className='rounded-md bg-black/90 text-nowrap py-2 px-4 w-fit text-primary link hover:bg-primary/90 hover:text-white'
        >
          go shopping
        </Link>
      </div>
    );
  }

  const isStepComplete = (fields: string[]) => {
    const errorsList = Object.keys(errors);
    return fields.every((field) => errorsList.includes(field));
  };
  const check = isStepComplete(['full_name', 'card', 'email']);

  const fieldItems = getFieldList(errors);
  return (
    <form
      className='md: w-full flex flex-col gap-y-6'
      onSubmit={handleFormSubmit}
    >
      {fieldItems.map((field) => (
        <FormField key={field.fieldName} register={register} {...field} />
      ))}
      <div>
        <p className='capitalize font-semibold'>card type</p>
        <div className='flex items-center gap-3'>
          {paymentGateways.map(({ img, value }) => {
            // const active = paymentValue === value;
            return (
              <Image
                src={img}
                alt={value}
                width={500}
                height={500}
                unoptimized
                key={value}
                className={`w-20 py-2 px-5 cursor-pointer hover:border`}
                onClick={() => {
                  setValue('card', value);
                }}
              />
            );
          })}
        </div>
        {errors?.card ? (
          <span role='alert' className='text-pink-500 text-sm'>
            {errors?.card.message}
          </span>
        ) : null}
      </div>
      <label htmlFor='' className='flex gap-1 items-center'>
        <input type='checkbox' {...register('cash_on_delivery')} />
        cash on delivery
      </label>
      <DefaultButton type='submit'>submit</DefaultButton>
    </form>
  );
}

const getFieldList = (
  errors: FieldErrors<FieldsType>
): {
  fieldName: Path<FieldsType>;
  error: FieldError | undefined;
  id: string;
  placeholder?: string;
  label: string;
  type?: string;
  value?: string;
}[] => {
  return [
    {
      fieldName: 'full_name',
      error: errors.full_name,
      id: 'full_name',
      placeholder: 'John Doe',
      label: 'full name',
    },
    {
      fieldName: 'address',
      error: errors.address,
      id: 'address',
      placeholder: '23 bole avenue',
      label: 'street address',
    },
    {
      fieldName: 'appartment',
      error: errors.appartment,
      id: 'apartment',
      placeholder: 'peak house, 2nd floor,room 2',
      label: 'apartment,floor,e.t.c(optional)',
    },
    {
      fieldName: 'city',
      error: errors.city,
      id: 'city',
      placeholder: 'Ikeja | Atlanta',
      label: 'town/city',
    },
    {
      fieldName: 'phone_number',
      error: errors.phone_number,
      id: 'phone_number',
      placeholder: '+234900000000',
      label: 'phone number',
    },
    {
      fieldName: 'email',
      error: errors.email,
      id: 'email',
      placeholder: 'user@example.com',
      label: 'email address',
    },
  ];
};

const ShippingInformation = () => {
  return (
    <div className='bg-white rounded-xl py-2 px-4'>
      <div className='flex items-center justify-between gap-x-1'>
        <h3 className='capitalize text-nowrap font-semibold text-sm'>
          shipping information
        </h3>
        <DefaultButton className='flex text-nowrap text-xs items-center text-grey-100'>
          change address
          <Icons.pen size={20} />
        </DefaultButton>
      </div>
      <p className='max-w-[10rem] text-wrap text-grey-100 text-sm mt-5 leading-6'>
        455 Marlborough Ave. West Bend, WI 53095
      </p>
    </div>
  );
};

const PaymentCard = () => {
  const [paymentValue, setPaymentValue] = useState('');

  const handleClick = (value: string) => {
    setPaymentValue(value);
  };

  return (
    <div className='bg-white rounded-xl py-2 px-4'>
      <h3>select your payment card</h3>
      <div className='flex items-center mt-4'>
        <input
          type='radio'
          value={paymentValue}
          readOnly
          className='mr-2'
          checked={!!paymentValue}
          aria-label='select payment card'
        />
        <div className='flex items-center gap-3'>
          {paymentGateways.map(({ img, value }) => {
            const active = paymentValue === value;
            return (
              <Image
                src={img}
                alt={value}
                width={200}
                height={200}
                unoptimized
                key={value}
                className={`w-40 py-2 px-5 ${
                  active ? 'border border-grey-200/80' : ''
                }`}
                onClick={() => setPaymentValue(value)}
              />
            );
          })}
        </div>
      </div>
      <div className='flex items-center gap-2 mt-3 text-grey-100'>
        <input type='radio' name='cash-on-delivery' id='cash-on-delivery' />
        <label htmlFor='cash-on-delivery'>Cash on Delivery</label>
      </div>
    </div>
  );
};

type LabelledInputProps = {
  label: string;
  type?: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const LabelledInput = ({
  label,
  id,
  placeholder,
  value,
  type = 'text',
  handleChange,
}: LabelledInputProps) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <label htmlFor={id} className='font-medium capitalize text-base'>
        {label}
      </label>
      <input
        name={id}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className='w-full border border-black/30 py-3 focus-within:outline-none focus:border-primary/70 focus:shadow-lg px-3 placeholder:capitalize rounded-xl'
      />
    </div>
  );
};

const PaymentForm = () => {
  const initialValues = {
    fullName: '',
    cardNumber: '',
    cvv: '',
    expiryDate: '',
  };
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form
      className='bg-white rounded-xl py-2 px-4 flex flex-col gap-y-3'
      onSubmit={handleFormSubmit}
    >
      <LabelledInput
        id='fullName'
        placeholder='enter your full name'
        value={formData.fullName}
        handleChange={handleChange}
        label='fullname'
      />
      <LabelledInput
        id='cardNumber'
        placeholder='enter your card number'
        value={formData.cardNumber}
        handleChange={handleChange}
        label='card number'
        type='number'
      />
      <div className='flex items-center justify-between gap-2'>
        <LabelledInput
          id='expiryDate'
          placeholder='expiry date'
          value={formData.expiryDate}
          handleChange={handleChange}
          label='expiry date'
          type='date'
        />
        <LabelledInput
          id='cvv'
          placeholder='CVV'
          value={formData.cvv}
          handleChange={handleChange}
          label='CVV'
          type='number'
        />
      </div>
      <DefaultButton
        type='submit'
        className='w-fit self-center bg-black text-white px-5 py-2 capitalize'
      >
        proceed
      </DefaultButton>
    </form>
  );
};

const paymentGateways = [
  {
    value: 'visa',
    img: '/assets/icons/visa-credit-card.svg',
  },
  {
    value: 'verve',
    img: '/assets/icons/Verve-logo.svg',
  },
  {
    value: 'mastercard',
    img: '/assets/icons/mastercard.svg',
  },
];
