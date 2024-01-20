import { ProductType } from '@/types/product';

export const categories = [
  {
    name: 'all furniture',
    value: '',
  },
  {
    name: 'bedroom',
    value: 'bedroom',
  },
  {
    name: 'living room',
    value: 'living room',
  },
  {
    name: 'home office',
    value: 'home office',
  },
  {
    name: 'dining table',
    value: 'dining table',
  },
];

export const heroProducts: ProductType[] = [
  {
    id: 0,
    name: 'stylish soft chair',
    image: '/assets/images/stylish-sot-chair.png',
    price: 20,
    label: 'bedroom dining table',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'new',
    description:
      'The Stylish Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    inStock: true,
  },
  {
    id: 1,
    name: 'modern soft chair',
    image: '/assets/images/modern-soft-chair2.png',
    price: 40,
    label: 'living room home office',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'hot',
    description:
      'The Modern Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    inStock: false,
  },
  {
    id: 2,
    name: 'comfortable soft chair',
    image: '/assets/images/comfortable-soft-chair.png',
    price: 40,
    label: 'bedroom home office',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'new',
    description:
      'The Comfortable Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    inStock: true,
  },
  {
    id: 3,
    name: 'new soft chair',
    image: '/assets/images/new-soft-chair.png',
    price: 20,
    label: 'living room dining table',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: '',
    description:
      'The New Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    inStock: true,
  },
  {
    id: 4,
    name: 'new light soft chair',
    image: '/assets/images/red-cushion.png',
    price: 80,
    label: 'living room',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'new',
    description:
      'The New Light Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    inStock: true,
    discount: 10,
  },
  {
    id: 5,
    name: 'modern soft chair',
    image: '/assets/images/modern-soft-chair.png',
    price: 32,
    label: 'living room',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: '',
    description:
      'The Modern Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    inStock: true,
  },
  {
    id: 6,
    name: 'old modern soft chair',
    image: '/assets/images/old-modern-soft-chair.png',
    price: 70,
    label: 'living room',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'trending',
    description:
      'The Old Modern Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    inStock: true,
  },
  {
    id: 7,
    name: 'stylish soft chair',
    image: '/assets/images/stlish-soft-chair.png',
    price: 20,
    label: 'living room',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: '',
    description:
      'The Stylish Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    inStock: true,
  },
];

export const ALL_PRODUCTS = [...heroProducts];
