"use client";
import { Icons } from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DefaultButton from "../buttons/default-button";
import Overlay from "../shared/overlay";
import { useSession } from "../store/contexts/session-context";
import CartLink from "./cart";
import NavLinks from "./nav-links";
import WishlistLink from "./wishlist";

export default function MainNav() {
  const [showMenu, setShowMenu] = useState(false);
  const { isSignedIn } = useSession();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header className="flex justify-between py-10 w-11/12 lg:w-4/5 mx-auto">
      <div className="flex gap-3 md:gap-7">
        <DefaultButton
          className="text-primary md:hidden link"
          onClick={toggleMenu}
        >
          <Icons.menu className="text-2xl" size={40} />
        </DefaultButton>
        <Link href={"/"} className="link">
          <Image
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={40}
            height={40}
            className="w-9"
          />
        </Link>
      </div>
      <NavLinks
        navigationLinks={navigationLinks}
        className="md:flex gap-x-5 items-center hidden"
        linkStyle="first:text-primary font-bold text-black first:border-b-2 first:border-primary capitalize link hover:text-primary/80"
      />
      <div className="flex items-center gap-1 md:gap-3">
        <WishlistLink />
        <CartLink />

        <Link
          href={"/profile"}
          className="text-primary rounded-[2rem] px-1 py-2 capitalize relative link group"
        >
          <Icons.person className="group-hover:fill-white" />
        </Link>
      </div>

      {showMenu ? (
        <>
          <Overlay handleClick={toggleMenu} />
          <div className="fixed inset-y-0 bg-white-gradient left-0 w-2/4 py-10 px-7 rounded-tr-sl z-[100] md:hidden transition-transform animate-slide-in">
            <div className="flex items-center justify-between w-full mb-9">
              {" "}
              <Image
                src={"/assets/images/logo.svg"}
                alt="logo"
                width={40}
                height={40}
                className="w-6"
              />
              <DefaultButton onClick={toggleMenu} className="text-xl">
                <Icons.close />
              </DefaultButton>
            </div>
            <NavLinks
              navigationLinks={navigationLinks}
              className="flex flex-col gap-y-5 items-start"
              linkStyle="first:text-primary font-bold text-black first:border-b-2 first:border-primary capitalize w-fit hover:text-primary/80"
              handleLinkClick={toggleMenu}
            />
          </div>
        </>
      ) : null}
    </header>
  );
}

const navigationLinks: {
  path: string;
  title: string;
}[] = [
  {
    path: "/products",
    title: "shop now",
  },
  {
    path: "",
    title: "about us",
  },
  {
    path: "",
    title: "contact us",
  },
];
