import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergeStyles(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
