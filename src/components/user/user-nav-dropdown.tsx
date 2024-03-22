"use client";

import { Icons } from "@/lib/icons";
import { mergeStyles } from "@/utils/style-helpers";
import Link from "next/link";
import { useState } from "react";
import Logout from "../navigation/logout";
import { useSession } from "../store/contexts/session-context";

export default function UserNavDropdown() {
  const { isSignedIn } = useSession();

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-primary rounded-[2rem] p-2 group"
        title="user menu navigation"
      >
        <Icons.person className="group-hover:fill-white " />
      </button>
      {showDropdown ? (
        <nav
          className={mergeStyles(
            "absolute top-full bg-background rounded py-3 grid text-nowrap px-5 right-0 animate-in duration-500 ease-in-out"
          )}
        >
          {isSignedIn ? (
            <>
              <Logout />
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className="text-primary capitalize link hover:bg-white hover:text-primary"
              >
                login
              </Link>
              <Link
                href={"/signup"}
                className="text-primary capitalize link hover:bg-white hover:text-primary"
              >
                sign up
              </Link>
            </>
          )}
        </nav>
      ) : null}
    </div>
  );
}
