'use client';

import { useState } from 'react';
import DefaultButton from '../buttons/default-button';
import { Icons } from '@/lib/icons';
import useSearchParams from '../hooks/use-search-params';

type FilterProps = {
  className: string;
};

export default function Filter({ className }: FilterProps) {
  const { searchParams, updateSearchParams } = useSearchParams();

  const items: Wrapper[] = [
    {
      title: 'category',
      list: categories,
      tab: searchParams.get('category') ?? '',
      listStyles: '',
      label: 'category',
    },
    {
      title: 'color family',
      list: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
      tab: searchParams.get('color') ?? '',
      listStyles: 'flex gap-1 flex-wrap',
      label: 'color',
      type: 'color',
    },
    {
      title: 'price',
      list: ['10', '50', '70', '80'],
      tab: searchParams.get('price') ?? '',
      listStyles: 'flex flex-wrap',
      label: 'price',
      type: 'price',
    },
  ];

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item) => (
        <FilterWrapper key={item.title} {...item} />
      ))}
    </div>
  );
}

type Wrapper = {
  list: string[];
  title: string;
  listStyles: string;
  type?: 'default' | 'color' | 'price';
  tab: string;
  label: string;
};

const FilterWrapper = ({
  list,
  title,
  tab,
  type = 'default',
  listStyles,
  label,
}: Wrapper) => {
  const { updateSearchParams } = useSearchParams();
  const [showContent, setShowContent] = useState(true);
  const toggleContent = () => {
    setShowContent((prev) => !prev);
  };
  return (
    <div>
      <DefaultButton
        onClick={toggleContent}
        className='flex items-center justify-between w-full border py-2 px-1 mb-2'
      >
        <span className='capitalize font-medium font-inter text-lg'>
          {title}
        </span>
        <Icons.down
          className={`${showContent ? 'rotate-180' : 'rotate-[270deg]'}`}
        />
      </DefaultButton>
      {showContent ? (
        <ul className={`px-3 py-1 text-grey-100 ${listStyles}`}>
          {list.map((item) => {
            const activeCategory = item === tab;
            const colors =
              type === 'color'
                ? {
                    backgroundColor: item,
                  }
                : {};
            return (
              <li
                key={item}
                onClick={() => updateSearchParams(label, item)}
                className={`${
                  activeCategory ? 'bg-grey-300 rounded-2xl' : ''
                } relative capitalize cursor-pointer ${
                  type === 'color' ? 'size-7 rounded-full' : 'w-fit px-5 py-1'
                }`}
                style={colors}
              >
                {type === 'color'
                  ? null
                  : `${type === 'price' ? '$' : ''}${item}`}
                {activeCategory && type === 'color' ? (
                  <Icons.check
                    className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 text-white font-bold'
                    size={20}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

const categories = ['wardropes', 'beds', 'mattresses', 'dressers', 'drawers'];
