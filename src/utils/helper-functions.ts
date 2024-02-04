import { ProductType } from '@/types/product';
// import prisma from '@/lib/db';
import { ALL_PRODUCTS, categories } from '@/constants/data';
import { readUserSession } from '@/lib/actions/user';
import { redirect } from 'next/navigation';

export async function getProduct(id: string) {
  try {
    // const product = await prisma.product.findUnique({
    //   where: { id },
    //   include: { category: true },
    // });

    // return product;
    return ALL_PRODUCTS.find((product) => product.id === id);
  } catch (error) {
    return ALL_PRODUCTS.find((product) => product.id === id);
  }
}

export async function getAllProducts() {
  try {
    // const products = await prisma.shop.findUnique({
    //   where: { id: '1' },

    //   select: { products: { include: { category: true } } },
    // });

    // const products = await prisma.product.findMany({
    //   include: { category: true },
    // });

    // return products ? products.products : [];
    return ALL_PRODUCTS;
  } catch (error) {
    console.log(error);
    return ALL_PRODUCTS;
  }
}

export async function getCategories() {
  try {
    // const categories = await prisma.category.findMany();
    // return categories || [];
    return categories;
  } catch (error) {
    console.log(error);
    return categories;
  }
}

export async function redirectIfSession(to: string = '/') {
  const { data } = await readUserSession();

  if (data?.session) {
    redirect(to);
  }
}

export function calculateDiscount(price: number, discount: number = 0) {
  return discount ? price - price * (discount / 100) : price;
}
