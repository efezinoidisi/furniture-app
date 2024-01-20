'use client';

import React from 'react';
import useCategory from '../hooks/use-category';
import Category from '../product/category';

export default function ProductsCategory() {
  const { currentCategory, toggleCategory } = useCategory();
  return (
    <Category
      currentCategory={currentCategory}
      toggleCategory={toggleCategory}
    />
  );
}
