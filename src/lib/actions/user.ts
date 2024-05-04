"use server";
import { ZodError } from "zod";

import {
  AddressSchema,
  BillingInfoSchema,
  PaymentSchema,
} from "@/types/schemas";
import { State } from "@/types/shipping";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import createSupabaseServerClient from "../supabase/server";

export async function readUserSession() {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);

  return supabase.auth.getSession();
}

export async function getUser() {
  try {
    const cookieStore = cookies();

    const supabase = await createSupabaseServerClient(cookieStore);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;

    return user;
  } catch (error) {
    return null;
  }
}

export async function redirectIfSession(to: string = "/") {
  const user = await getUser();

  if (!user) return;

  redirect(to);
}

export async function transferFromCartToOrderItem(order_id: string) {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);

  const { error, data } = await supabase.from("cart").select();
  if (error) {
    throw new Error(error.message);
  }

  const orders = data.map((item) => ({
    ...item,
    order_id,
  }));

  const { error: orderError } = await supabase
    .from("order_item")
    .insert(orders);

  if (orderError) {
    throw new Error(orderError.message);
  }
}

export async function selectAddressAction(
  prevState: State | undefined,
  formData: FormData
): Promise<State | undefined> {
  const result = AddressSchema.safeParse({
    address: formData.get("address"),
    total_price: formData.get("total_price"),
  });
  if (!result.success) {
    return {
      status: "error",
      message: "please select an address",
    };
  }

  const address = result.data.address;
  const total = result.data.total_price;

  const cookieStore = cookies();

  try {
    // add address to order
    const orderId = cookieStore.get("zf-order-id");

    if (orderId) {
      return {
        status: "success",
        message: "",
      };
    }
    const supabase = await createSupabaseServerClient(cookieStore);

    const today = new Date();
    today.setDate(today.getDate() + 14);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        status: "error",
        message: userError?.message || "invalid credentials",
      };
    }
    // create new order
    const { data, error } = await supabase
      .from("order")
      .insert({
        shipment_id: address,
        date: today.toDateString(),
        user_id: user.id,
        total_price: +total,
      })
      .select()
      .single();

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    transferFromCartToOrderItem(data.id);
    cookieStore.set("zf-order-id", data.id);

    return {
      status: "success",
      message: "",
    };
  } catch (error) {
    return {
      status: "error",
      message: "server error! please try again.",
    };
  }
}

export async function newAddressAction(
  _: State | undefined,
  formData: FormData
): Promise<State | undefined> {
  try {
    const parsedData = BillingInfoSchema.parse(formData);

    // add to supabase

    const cookieStore = cookies();

    const supabase = await createSupabaseServerClient(cookieStore);

    const user = await getUser();

    if (!user) {
      return {
        status: "error",
        message: "Invalid credentials!",
      };
    }
    const { error } = await supabase.from("shipment").insert({
      ...parsedData,
      user_id: user.id,
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "invalid form data",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }

    return {
      status: "error",
      message: "Server Error, please try again",
    };
  }

  revalidatePath("/checkout");
  redirect("/checkout");
}

export async function deleteAddress(id: string) {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);

  const { error } = await supabase.from("shipment").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/checkout");
}

export async function updateAddress(
  id: string,
  _: State | undefined,
  formData: FormData
): Promise<State | undefined> {
  const cookieStore = cookies();
  try {
    const parsedData = BillingInfoSchema.parse(formData);

    const supabase = await createSupabaseServerClient(cookieStore);

    const user = await getUser();

    if (!user) {
      return {
        status: "error",
        message: "Invalid credentials!",
      };
    }
    const { error } = await supabase
      .from("shipment")
      .update({
        ...parsedData,
      })
      .eq("id", id);

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "invalid form data",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }

    return {
      status: "error",
      message: "Server Error, please try again",
    };
  }

  revalidatePath("/checkout");
  redirect("/checkout");
}

export async function getAddress(id: string) {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);

  const { error, data } = await supabase
    .from("shipment")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function paymentAction(
  _: State | undefined,
  formData: FormData
): Promise<State | undefined> {
  const result = PaymentSchema.safeParse({
    amount: formData.get("amount"),
    method: formData.get("method"),
  });
  if (!result.success) {
    return {
      status: "error",
      message: "please select a payment method",
    };
  }

  const amount = result.data.amount;
  const method = result.data.method;

  const cookieStore = cookies();

  try {
    const orderId = cookieStore.get("zf-order-id");

    if (!orderId) {
      return {
        status: "error",
        message: "no order found",
      };
    }
    const supabase = await createSupabaseServerClient(cookieStore);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        status: "error",
        message: userError?.message || "invalid credentials",
      };
    }
    // create new payment
    const { data, error } = await supabase
      .from("payment")
      .insert({
        method,
        user_id: user.id,
        amount: +amount,
      })
      .select()
      .single();

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
    const { error: orderError } = await supabase
      .from("order")
      .update({ payment_id: data.id })
      .eq("id", orderId.value);

    if (orderError) {
      return {
        status: "error",
        message: orderError.message,
      };
    }
    cookieStore.delete("zf-order-id");

    return {
      status: "success",
      message: "",
    };
  } catch (error) {
    return {
      status: "error",
      message: "server error! please try again.",
    };
  }
}
