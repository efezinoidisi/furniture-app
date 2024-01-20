'use client';
import { Icons } from '@/lib/icons';
import DefaultButton from '../buttons/default-button';
import { HTMLInputTypeAttribute, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useCart from '../store/contexts/cart-context';

export default function ShippingDetails() {
  const { cart } = useCart();
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
  return (
    <div className='md: w-full flex flex-col gap-y-6'>
      <ShippingInformation />
      <PaymentCard />
      <PaymentForm />
    </div>
  );
}

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
  return (
    <form className='bg-white rounded-xl py-2 px-4 flex flex-col gap-y-3'>
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
    img: '/assets/images/visa.png',
  },
  {
    value: 'bkash',
    img: '/assets/images/bkash.png',
  },
  {
    value: 'mastercard',
    img: '/assets/images/mastercard.png',
  },
];
