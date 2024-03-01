'use server';

import createSupabaseServerClient from '../supabase/server';
import { cookies } from 'next/headers';

export async function getProduct(id: string) {
  const cookieStore = cookies();
  try {
    const supabase = await createSupabaseServerClient(cookieStore);
    const { data, error } = await supabase
      .from('product')
      .select('*, category (name,id)')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  const cookieStore = cookies();

  try {
    const supabase = await createSupabaseServerClient(cookieStore);
    const { data, error } = await supabase
      .from('product')
      .select(`*, category (name,id)`);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('failed to fetch products');
  }
}

export async function getCart() {
  const cookieStore = cookies();

  try {
    const supabase = await createSupabaseServerClient(cookieStore);
    const { data, error } = await supabase
      .from('cart')
      .select(`quantity, product (*)`);
    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('failed to fetch cart');
  }
}
