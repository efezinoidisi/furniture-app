'use client';

import { categories } from '@/constants/data';
type Props = {
  currentCategory: string;
  toggleCategory: (key: string, value: string) => void;
};

export default function Category({ currentCategory, toggleCategory }: Props) {
  return (
    <ul className='flex gap-5 overflow-x-scroll hide-scrollbar my-10 md:overflow-x-clip md:flex-wrap'>
      {categories.map((category) => {
        const active = category.value === currentCategory;
        return (
          <li
            key={category.name}
            role='button'
            className={`${
              active
                ? 'bg-opacity-100 text-white'
                : 'bg-opacity-[0.15] text-black'
            } bg-black rounded-sl px-3 py-1 cursor-pointer capitalize text-sm md:text-base lg:text-lg  md:px-5 text-nowrap`}
            onClick={() => toggleCategory('type', category.value)}
          >
            {category.name}
          </li>
        );
      })}
      {/* <li className='bg-black rounded-sl px-3 py-1 bg-opacity-[0.15] text-black capitalize text-sm md:text-base lg:text-lg md:px-5'>
        <Link href={''}>more</Link>
      </li> */}
    </ul>
  );
}
