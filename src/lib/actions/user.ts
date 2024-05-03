"use server";
import { ZodError } from "zod";

import { AddressSchema, BillingInfoSchema } from "@/types/schemas";
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

export async function redirectIfSession(to: string = "/") {
  const { data } = await readUserSession();

  if (data?.session) {
    redirect(to);
  }
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

export async function selectAddressAction(
  prevState: State | undefined,
  formData: FormData
): Promise<State | undefined> {
  try {
    const { address } = AddressSchema.parse(formData);

    // add address to order
    const cookieStore = cookies();
    const orderId = cookieStore.get("zf-order-id");

    const supabase = await createSupabaseServerClient(cookieStore);

    const today = new Date();
    today.setDate(today.getDate() + 14);

    // create new order
    const { data, error } = await supabase
      .from("order")
      .insert({
        shipment_id: address,
        date: today.toDateString(),
      })
      .select();

    console.log(data, error);
    return {
      status: "success",
      message: "",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "please select an address",
      };
    }
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
