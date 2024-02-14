'use client';

import debounce from 'lodash.debounce';

import useSearchParams from '../hooks/use-search-params';

export default function Search() {
  const { searchParams, updateSearchParams } = useSearchParams();

  const q = searchParams.get('q')?.toString();

  const handleChange = debounce((value: string) => {
    updateSearchParams('q', value);
  }, 500);

  return (
    <input
      type='search'
      onChange={(event) => handleChange(event.target.value)}
      defaultValue={q}
      className='md:w-1/2 md:ml-auto rounded-lg my-10 w-full p-2 focus-visible:outline focus-visible:outline-primary/20 outline-none block '
      aria-label='search for furniture by name'
      placeholder='search for furniture by name'
    />
  );
}
