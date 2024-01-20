'use client';
import { Icons } from '@/lib/icons';
import { useRouter } from 'next/navigation';
import DefaultButton from './default-button';

export default function Back() {
  const { back } = useRouter();
  return (
    <DefaultButton onClick={back} className='lg:hidden'>
      <Icons.left />
    </DefaultButton>
  );
}
