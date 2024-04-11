"use client";
import DefaultButton from "@/components/buttons/default-button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { back } = useRouter();

  return (
    <div className="relative">
      <Image
        src={"/assets/images/404-error-lost-in-space-cuate.svg"}
        alt=""
        width={500}
        height={600}
        unoptimized
        className="w-full"
      />

      <DefaultButton onClick={back}>go back</DefaultButton>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <a href="https://storyset.com/online">
          Online illustrations by Storyset
        </a>
      </div>
    </div>
  );
}
