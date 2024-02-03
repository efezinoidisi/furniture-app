'use client';

import { Suspense, useState } from 'react';
import BreadCrump from '../breadcrumb/breadcrump';
import Back from '../buttons/back';
import DefaultButton from '../buttons/default-button';
import { Icons } from '@/lib/icons';
import Filter from './filter';
import Overlay from '../shared/overlay';
import Ellipsis from '../loaders/ellipsis';

type TopProps = {
  categories: string[];
};

export default function Top({ categories }: TopProps) {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <>
      <Back />
      <h2>products catalogue</h2>
      <div className='flex items-center justify-between my-6'>
        <BreadCrump items={[{ path: '/products', title: 'all furnitures' }]} />
        <DefaultButton className='md:hidden' onClick={toggleFilter}>
          <Icons.filter />
        </DefaultButton>
      </div>

      {showFilter ? (
        <>
          <Overlay handleClick={toggleFilter} />
          <div className='fixed inset-0 top-32 bg-white z-50 rounded-t-sl py-10 px-10 flex flex-col gap-y-5'>
            <div className='flex items-center justify-between'>
              <h5 className='capitalize font-inter text-xl font-bold'>
                filters
              </h5>
              <DefaultButton onClick={toggleFilter}>
                <Icons.close />
              </DefaultButton>
            </div>
            <Suspense fallback={<Ellipsis />}>
              <Filter className='' categories={categories} />
            </Suspense>
          </div>
        </>
      ) : null}
    </>
  );
}
