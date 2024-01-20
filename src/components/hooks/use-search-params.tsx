'use client';
import {
  useSearchParams as DefaultUseSearchParams,
  useRouter,
  usePathname,
} from 'next/navigation';
import { useCallback } from 'react';

export default function useSearchParams() {
  const searchParams = DefaultUseSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);

      const url = `${pathname}?${params.toString()}`;
      replace(url, { scroll: false });
    },
    [searchParams, pathname, replace]
  );
  return { searchParams, updateSearchParams };
}
