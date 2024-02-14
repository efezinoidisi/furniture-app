'use client';
import { ReactNode, useRef } from 'react';
import DefaultButton from '../buttons/default-button';
import { Icons } from '@/lib/icons';

export default function CarouselWrapper({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLUListElement | null>(null);

  function scrollLeft() {
    containerRef?.current?.scrollBy({
      left: -window.innerWidth,
      behavior: 'smooth',
    });
  }

  function scrollRight() {
    containerRef?.current?.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth',
    });
  }

  return (
    <div className='relative'>
      <ul
        ref={containerRef}
        className='flex overflow-x-scroll hide-scrollbar relative gap-3'
      >
        {children}
      </ul>

      <DefaultButton
        className='absolute top-1/2 -translate-y-1/2 left-3 z-10'
        onClick={scrollLeft}
        aria-labelledby='scroll to the left'
      >
        <Icons.left />
      </DefaultButton>
      <DefaultButton
        className='absolute top-1/2 -translate-y-1/2 right-3 z-10'
        onClick={scrollRight}
        aria-labelledby='scroll to the right'
      >
        <Icons.right />
      </DefaultButton>
    </div>
  );
}
