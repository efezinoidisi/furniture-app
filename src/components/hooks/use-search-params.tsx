'use client';
import {
  useSearchParams as DefaultUseSearchParams,
  useRouter,
  usePathname,
} from 'next/navigation';
import { useCallback } from 'react';

export default function useSearchParams(scroll: boolean = false) {
  const searchParams = DefaultUseSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value === 'all' ? '' : value);
      }

      const url = `${pathname}?${params.toString()}`;
      replace(url, { scroll });
    },
    [searchParams, pathname, replace, scroll]
  );
  return { searchParams, updateSearchParams };
}
