import { z } from "zod";
import { zfd } from "zod-form-data";

export const SignUpSchema = z
  .object({
    username: z
      .string({ required_error: "username is required" })
      .min(3, "username must be at least 3 characters"),
    // .refine(async () => {
    //   const isValid = false; // api call to server
    //   return isValid;
    // }, 'username already exists'),
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters"),
    confirmPassword: z.string(),
    // avatar_url: z.string().url(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export const ForgotPasswordSchema = z.object({ email: z.string().email() });

export const ResetPasswordSchema = z
  .object({
    new_password: z.string().min(8, "password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "passwords do not match",
    path: ["confirm_password"],
  });

export const BillingInfoSchema = zfd.formData({
  full_name: z.string().min(3, "full name is required"),
  street: z.string().min(3, "please provide your address"),
  apartment: z.string().min(1, "apartment is required"),
  city: z.string().min(2, "city is required"),
  phone_number: z.string().min(8, "phone number is required"),
  state: z.string().min(2, "state is required"),
  country: z.string().min(2, "country is required"),
});

export const AddressSchema = z.object({
  address: z.string().min(1),
  total_price: z.string().min(1),
});

export const PaymentSchema = z.object({
  amount: z.string().min(1),
  method: z.string().min(1),
});
