'use client';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import DefaultButton from '../buttons/default-button';
import { Icons } from '@/lib/icons';

type Props = {
  value?: string;
};

export default function Share({ value = '' }: Props) {
  const [result, setResult] = useState('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${searchParams.toString()}`;
  const text = value ?? url;

  return (
    <DefaultButton className='flex items-center gap-1 text-black capitalize relative pr-4 py-4'>
      <Icons.share className='bg-[#DFE7EB] p-2 rounded-full' size={40} />
      share
      {result ? (
        <span className='absolute right-0 top-0 text-xs rounded-full bg-grey-300 p-1 lowercase'>
          {result}
        </span>
      ) : null}
    </DefaultButton>
  );
}
