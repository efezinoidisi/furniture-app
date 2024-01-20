'use client';
import { useState } from 'react';

export default function useCategory() {
  const [currentCategory, setCurrentCategory] = useState('');

  const toggleCategory = (value: string) => {
    setCurrentCategory(value);
  };

  return { currentCategory, toggleCategory };
}
