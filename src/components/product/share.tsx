"use client";
import { Icons } from "@/lib/icons";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  value?: string;
};

export default function Share() {
  const [isCopied, setIsCopied] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }${pathname}?${searchParams.toString()}`;

  const copyToClipboard = () => {
    if (typeof window === "undefined") {
      return;
    }

    if (!url) {
      return;
    }
    console.log("value is", url);

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
          console.log("fail");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      className="flex items-center gap-1 text-black capitalize relative pr-4 py-4"
      onClick={copyToClipboard}
    >
      <Icons.share className="bg-[#DFE7EB] p-2 rounded-full" size={40} />
      share
      {isCopied ? (
        <span className="absolute right-0 top-0 text-xs rounded-full bg-grey-300 p-1 lowercase">
          copied
        </span>
      ) : null}
    </button>
  );
}
