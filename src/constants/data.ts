import { ProductType } from '@/types/product';

export const categories = [
  // {
  //   name: 'all furniture',
  //   id: '0',
  // },
  {
    name: 'bedroom',
    id: '1',
  },
  {
    name: 'living room',
    id: '2',
  },
  {
    name: 'office',
    id: '3',
  },
  {
    name: 'dining',
    id: '4',
  },
];

export const heroProducts: ProductType[] = [
  {
    id: '0',
    name: 'stylish soft chair',
    image: '/assets/images/stylish-sot-chair.png',
    price: 20,
    category: {
      id: '1',
      name: 'bedrooom',
    },
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'new',
    description:
      'The Stylish Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    stock: 10,
    discount: 0,
  },
  {
    id: '1',
    name: 'modern soft chair',
    image: '/assets/images/modern-soft-chair2.png',
    price: 40,
    category: {
      id: '2',
      name: 'living room',
    },
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'hot',
    description:
      'The Modern Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    stock: 5,
    discount: 0,
  },
  {
    id: '2',
    name: 'comfortable soft chair',
    image: '/assets/images/comfortable-soft-chair.png',
    price: 40,
    category: {
      name: 'dining',
      id: '4',
    },
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'new',
    description:
      'The Comfortable Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    stock: 2,
    discount: 0,
  },
  {
    id: '3',
    name: 'new soft chair',
    image: '/assets/images/new-soft-chair.png',
    price: 20,
    category: {
      name: 'dining',
      id: '4',
    },
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: '',
    description:
      'The New Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    stock: 0,
    discount: 0,
  },
  {
    id: '4',
    name: 'new light soft chair',
    image: '/assets/images/red-cushion.png',
    price: 80,
    category: {
      name: 'office',
      id: '3',
    },
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'new',
    description:
      'The New Light Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    stock: 20,
    discount: 10,
  },
  {
    id: '5',
    name: 'modern soft chair',
    image: '/assets/images/modern-soft-chair.png',
    price: 32,
    category: {
      name: 'living room',
      id: '2',
    },
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: '',
    description:
      'The Modern Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    stock: 7,
    discount: 0,
  },
  {
    id: '6',
    name: 'old modern soft chair',
    image: '/assets/images/old-modern-soft-chair.png',
    price: 70,
    category: {
      name: 'office',
      id: '3',
    },
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: 'trending',
    description:
      'The Old Modern Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    stock: 50,
    discount: 0,
  },
  {
    id: '7',
    name: 'stylish soft chair',
    image: '/assets/images/stlish-soft-chair.png',
    price: 20,
    category: {
      name: 'bedroom',
      id: '1',
    },
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    promo: '',
    description:
      'The Stylish Soft Chair boasts a harmonious blend of modern design and plush comfort. With its sleek lines, ',
    stock: 9,
    discount: 0,
  },
];

export const ALL_PRODUCTS = [...heroProducts];

export const COLORS = ['gray', 'red', 'brown', 'blue', 'green', 'purple'];
