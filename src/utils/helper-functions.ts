import { ProductType } from '@/types/product';
// import prisma from '@/lib/db';
import { ALL_PRODUCTS, categories } from '@/constants/data';
import { readUserSession } from '@/lib/actions/user';
import { redirect } from 'next/navigation';
import createSupabaseServerClient from '@/lib/supabase/server';

export async function getProduct(id: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('product')
      .select()
      .eq('id', id)
      .single();

    if (error) return ALL_PRODUCTS.find((product) => product.id === id);
    return data;
  } catch (error) {
    return ALL_PRODUCTS.find((product) => product.id === id);
  }
}

export async function getAllProducts() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('product')
      .select(`*, category (name)`);

    if (error) return ALL_PRODUCTS;
    return data;
  } catch (error) {
    console.log(error);
    return ALL_PRODUCTS;
  }
}

export async function getCategories() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from('category').select();

    if (error) return categories;
    return data;
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
