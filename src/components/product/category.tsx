'use client';

import { categories } from '@/constants/data';
import Link from 'next/link';

type Props = {
  currentCategory: string;
};

export default function Category({ currentCategory }: Props) {
  return (
    <ul className='flex gap-5 overflow-x-scroll hide-scrollbar my-10 md:overflow-x-clip md:flex-wrap'>
      <li
        className={`${
          currentCategory === ''
            ? 'bg-opacity-100 text-white'
            : 'bg-opacity-[0.15] text-black'
        } bg-black rounded-sl px-3 py-1 cursor-pointer capitalize text-sm md:text-base  md:px-5 text-nowrap`}
      >
        <Link href={'/'} scroll={false} prefetch>
          All
        </Link>
      </li>
      {categories?.map((category) => {
        const active = category.name === currentCategory;
        return (
          <li
            key={category.id}
            role='button'
            className={`${
              active
                ? 'bg-opacity-100 text-white'
                : 'bg-opacity-[0.15] text-black'
            } bg-black rounded-sl px-3 py-1 cursor-pointer capitalize text-sm md:text-base  md:px-5 text-nowrap`}
          >
            <Link href={`?type=${category.name}`} scroll={false} prefetch>
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
