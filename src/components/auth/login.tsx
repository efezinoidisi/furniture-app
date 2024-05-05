"use client";
import { signInWithEmailAndPassword } from "@/lib/actions/auth";
import { SignInSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DefaultButton from "../buttons/default-button";
import FormField from "../shared/form-field";
import GoogleAuthBtn from "./google-auth-btn";

type LoginFormProps = {
  next?: string;
};

export default function Login({ next = "" }: LoginFormProps) {
  const initialValues = {
    password: "",
    email: "",
  };

  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: initialValues,
  });
  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const response = await signInWithEmailAndPassword(data);
      const res = JSON.parse(response);
      if (res?.error) {
        toast.error(res.error.message);
      } else {
        toast.success("signed in!");
        push(`/${next}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed! please try again");
    }
  });

  const handleTestUserLogin = async () => {
    const loginPassword = process.env.NEXT_PUBLIC_LOGIN_PWD;
    setValue("email", "user2@example.com");
    setValue("password", loginPassword);

    const isValid = await trigger();
    if (isValid) {
      handleFormSubmit();
    }
  };

  return (
    <form
      className="flex flex-col gap-y-3 sl:w-3/4 md:w-full sl:mx-auto"
      onSubmit={handleFormSubmit}
    >
      <FormField
        fieldName="email"
        register={register}
        error={errors.email}
        placeholder="email"
        type="email"
      />
      <FormField
        fieldName="password"
        register={register}
        error={errors.password}
        placeholder="password"
        type="password"
      />
      <Link href={"/forgot-password"} className="self-end text-primary/80">
        forgot password?
      </Link>
      <DefaultButton
        type="submit"
        className="capitalize bg-accent text-white py-3 w-full self-center transition-all ease-linear hover:opacity-60"
      >
        {isSubmitting ? "sending" : "log in"}
      </DefaultButton>
      <span className='relative border border-black/50 after:content-["or"] after:absolute after:top-1/2 after:-translate-y-1/2 after:bg-background after:px-2 after:left-1/2 after:-translate-x-1/2 after:w-fit my-4' />
      <div className="space-y-5">
        <DefaultButton
          className="flex items-center gap-3 border w-full justify-center py-3 bg-white text-charcoal capitalize border-charcoal/50 hover:bg-secondary/40 transition-all ease-linear hover:opacity-80"
          type="button"
          onClick={handleTestUserLogin}
        >
          test user
        </DefaultButton>
        <GoogleAuthBtn />
      </div>
    </form>
  );
}
