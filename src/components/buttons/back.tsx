"use client";
import { Icons } from "@/lib/icons";
import { mergeStyles } from "@/utils/style-helpers";
import { useRouter } from "next/navigation";
import DefaultButton from "./default-button";

export default function Back({
  isTextVisibile = false,
  className = "",
}: {
  isTextVisibile?: boolean;
  className?: string;
}) {
  const { back } = useRouter();
  return (
    <DefaultButton
      onClick={back}
      className={mergeStyles("w-fit md:hidden", className)}
    >
      {isTextVisibile ? "go back" : <Icons.left />}
    </DefaultButton>
  );
}
