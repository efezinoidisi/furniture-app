"use client";

import Image from "next/image";

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <main className="flex flex-col justify-center items-center gap-6 min-h-[50dvh]">
      <h1 className="text-3xl text-charcoal font-semibold text-center">
        Oooops!! Something went wrong!
      </h1>

      <div className="relative">
        <Image
          src={"/assets/images/bug-fixing-bro.svg"}
          alt=""
          width={500}
          height={500}
          className="w-full max-w-3xl mx-auto"
          unoptimized
        />
        <a
          href="https://storyset.com/online"
          className="absolute bottom-0 right-0 text-[0.5rem] text-blue-400"
        >
          Online illustrations by Storyset
        </a>
      </div>

      {error?.message && <p className="text-center">{error?.message}</p>}
    </main>
  );
}
