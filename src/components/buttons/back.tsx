'use client';
import { Icons } from '@/lib/icons';
import { useRouter } from 'next/navigation';
import DefaultButton from './default-button';

export default function Back({
  isTextVisibile = false,
  className = 'md:hidden',
}: {
  isTextVisibile?: boolean;
  className?: string;
}) {
  const { back } = useRouter();
  return (
    <DefaultButton onClick={back} className={className}>
      {isTextVisibile ? 'go back' : <Icons.left />}
    </DefaultButton>
  );
}
