'use client';

import { useState } from 'react';
import DefaultButton from '../buttons/default-button';
import { Icons } from '@/lib/icons';
import useSearchParams from '../hooks/use-search-params';
import { COLORS, categories as CATEGORIES } from '@/constants/data';
import { mergeStyles } from '@/utils/style-helpers';

type FilterProps = {
  className: string;
};

export default function Filter({ className }: FilterProps) {
  const { searchParams } = useSearchParams();

  const categories = CATEGORIES.map((category) => category.name);

  const items: Wrapper[] = [
    {
      title: 'category',
      list: categories,
      tab: searchParams.get('category') ?? '',
      listStyles: 'flex gap-1 flex-wrap md:flex-nowrap md:flex-col',
      label: 'category',
      isOpen: true,
    },
    {
      title: 'color family',
      list: COLORS,
      tab: searchParams.get('color') ?? '',
      listStyles: 'flex gap-1 flex-wrap',
      label: 'color',
      isOpen: false,
    },
    {
      title: 'price',
      list: [
        '$0-$500',
        '$500-$1500',
        '$1500-$2500',
        '$2500-$5000',
        '$5000-$10000',
        '$10000-$25000',
      ],
      tab: searchParams.get('price') ?? '',
      listStyles: 'flex flex-wrap',
      label: 'price',
      isOpen: false,
    },
  ];

  return (
    <div className={mergeStyles('flex flex-col gap-4', className)}>
      {items.map((item) => (
        <FilterWrapper key={item.title} {...item} />
      ))}
    </div>
  );
}

type Wrapper = {
  list: (string | undefined)[];
  title: string;
  listStyles: string;
  tab: string;
  label: string;
  isOpen: boolean;
};

const FilterWrapper = ({
  list,
  title,
  tab,
  listStyles,
  label,
  isOpen,
}: Wrapper) => {
  const { updateSearchParams } = useSearchParams();
  const [showContent, setShowContent] = useState(isOpen);
  const toggleContent = () => {
    setShowContent((prev) => !prev);
  };
  return (
    <div>
      <DefaultButton
        onClick={toggleContent}
        className='flex items-center justify-between w-full border py-2 px-1 mb-2'
      >
        <span className='capitalize font-medium font-inter'>{title}</span>
        <Icons.down className={`${showContent ? 'rotate-180' : ''}`} />
      </DefaultButton>
      {showContent ? (
        <ul className={mergeStyles('px-3 py-1 text-grey-100 ', listStyles)}>
          {list?.map((item) => {
            if (!item) return null;
            const activeCategory = item === tab;

            return (
              <li
                key={item}
                className={`${
                  activeCategory ? 'text-black font-semibold bg-grey-300' : ''
                } relative text-base w-fit px-2 group hover:bg-grey-300/50 py-1 transition-colors duration-200 ease-linear rounded-md 
                }`}
              >
                <DefaultButton
                  onClick={() =>
                    updateSearchParams(label, activeCategory ? '' : item)
                  }
                  className='capitalize font-medium'
                >
                  {item}
                </DefaultButton>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
