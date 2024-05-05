"use server";

import { cookies } from "next/headers";
import createSupabaseServerClient from "../supabase/server";

export async function getProduct(id: string) {
  const cookieStore = cookies();
  try {
    const supabase = await createSupabaseServerClient(cookieStore);
    const { data, error } = await supabase
      .from("product")
      .select("*, category (name,id)")
      .eq("id", id)
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
      .from("product")
      .select(`*, category (name,id)`);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    // throw new Error('failed to fetch products');
  }
}

export async function getCart() {
  const cookieStore = cookies();

  try {
    const supabase = await createSupabaseServerClient(cookieStore);
    const { data, error } = await supabase
      .from("cart")
      .select(`quantity, product (*)`);
    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.log(error);
    // throw new Error("failed to fetch cart");
  }
}

export async function getShippingDetails() {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);
  const { data, error } = await supabase.from("shipment").select();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllOrders() {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);
  const { data, error } = await supabase
    .from("order_item")
    .select(
      "quantity,id,product (name, price,image),order_id, order (created_at,total_price, shipment_id,payment(method))"
    );
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
