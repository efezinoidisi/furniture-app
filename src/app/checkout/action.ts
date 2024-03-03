'use server';

import { getUser } from '@/lib/actions/user';
import createSupabaseServerClient from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';

const ShippingDetailsSchema = z.object({
  full_name: z.string(),
  address: z
    .string()
    .min(5, 'address must contain at least 5 characters')
    .max(256, 'can only contain at most 256 characters')
    .trim(),
  apartment: z.string(),
  city: z
    .string()
    .min(3, 'town/city must contain at least 3 characters')
    .trim(),
  phone_number: z.string().min(11, 'phone number must be at least 11 digits'),
  card: z.string().min(1, 'please select card type'),
  cash_on_delivery: z
    .string()
    .transform((value) => value === 'on')
    .nullable(),
  state: z.string().min(1, 'state cannot be empty'),
  country: z.string().min(1, 'country cannot be empty'),
});

export async function shippingDetailsAction(
  _prevState: any,
  formData: FormData
) {
  const input = ShippingDetailsSchema.safeParse({
    full_name: formData.get('full_name'),
    address: formData.get('address'),
    apartment: formData.get('apartment'),
    phone_number: formData.get('phone_number'),
    city: formData.get('city'),
    state: formData.get('state'),
    country: formData.get('country'),
    card: formData.get('card-type'),
    cash_on_delivery: formData.get('cash-on-delivery'),
  });

  if (!input.success) {
    return {
      errors: {
        ...input.error.formErrors.fieldErrors,
      },
    };
  }
  let shippingId = null;

  const cookieStore = cookies();

  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  try {
    const supabase = await createSupabaseServerClient(cookieStore);

    const { error, data } = await supabase
      .from('shipment')
      .insert([{ ...input.data, user_id: user.id }])
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    shippingId = data.id;
  } catch (error: any) {
    throw new Error(error?.message);
  }

  redirect(`/order/${shippingId}`);
}
