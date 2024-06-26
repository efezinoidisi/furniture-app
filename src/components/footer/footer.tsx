"use client";
import Image from "next/image";
import { FormEvent } from "react";
import DefaultButton from "../buttons/default-button";
import NavLinks from "../navigation/nav-links";

export default function Footer() {
  const year = new Date().getFullYear();

  const handleSubscription = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <footer className="text-grey-100 flex flex-col place-content-center min-h-72 gap-y-10 py-10  mt-9 md:py-16">
      <form
        className="flex flex-col gap-2 bg-secondary py-10 px-5 md:px-20 lg:px-32 md:py-16"
        onSubmit={handleSubscription}
      >
        <p className="mb-7 mt-3 text-charcoal text-lg">
          Join our newsletter to stay up to date on features and releases.
        </p>
        <div className="flex gap-2 lg:gap-4 bg-white p-1 rounded-md md:w-3/4 lg:w-1/2">
          <input
            type="email"
            name="subscribe"
            id="subscribe"
            placeholder="enter your email"
            className="p-3 bg-transparent outline-none w-full placeholder:capitalize"
          />
          <DefaultButton
            type="submit"
            className="px-5 py-1 lg:py-2  rounded-md border-grey-300 border capitalize text-sm bg-background"
          >
            subscribe
          </DefaultButton>
        </div>
        <p className="leading-5 text-xs text-balance mt-2 mb-3 text-charcoal">
          By subscribing you agree with our Privacy Policy and provide consent
          to receive updates from our company.
        </p>
      </form>
      <div className="flex flex-col gap-y-10 page-size lg:flex-row md:justify-start md:gap-x-8">
        <div className="flex items-center gap-2 md:self-start ">
          <Image
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={40}
            height={40}
            className="w-9"
          />
          <p>ZFurniture</p>
        </div>

        <div className="flex justify-between md:flex-1">
          <div className="">
            <h5 className="capitalize font-medium text-black mb-3 text-nowrap">
              about us
            </h5>
            <NavLinks
              navigationLinks={footerData.aboutUs}
              className="flex flex-col gap-y-3"
              linkStyle="capitalize text-sm"
            />
          </div>
          <div className="">
            <h5 className="capitalize font-medium text-black mb-3 text-nowrap">
              customer support
            </h5>
            <NavLinks
              navigationLinks={footerData.customerSupport}
              className="flex flex-col gap-y-3"
              linkStyle="capitalize text-sm"
            />
          </div>
          <div className="col-span-1">
            <h5 className="capitalize font-medium text-black mb-3 text-nowrap">
              follow us
            </h5>
            <NavLinks
              navigationLinks={footerData.followUs}
              className="flex flex-col gap-y-3"
              linkStyle="capitalize text-sm"
            />
          </div>
        </div>

        <div className="md:self-center lg:self-end text-sm">
          <p>© {year} ZFurniture. All rights reserved.</p>
          <div className="mt-3">
            <NavLinks
              navigationLinks={footerData.bottomLinks}
              className="flex gap-5"
              linkStyle="capitalize text-nowrap text-xs md:text-sm"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerData = {
  aboutUs: [
    {
      path: "",
      title: "FAQ",
    },
    {
      path: "",
      title: "contact",
    },
    {
      path: "",
      title: "returns",
    },
    {
      path: "",
      title: "blog",
    },
    {
      path: "",
      title: "shipping",
    },
  ],

  customerSupport: [
    {
      path: "",
      title: "affilates",
    },
    {
      path: "",
      title: "apple pay payments",
    },
    {
      path: "",
      title: "returns policy",
    },
  ],

  followUs: [
    {
      icons: "",
      title: "facebook",
      path: "",
    },
    {
      icons: "",
      title: "instagram",
      path: "",
    },
    {
      icons: "",
      title: "twitter/x",
      path: "",
    },
    {
      icons: "",
      title: "linkedIn",
      path: "",
    },
  ],

  bottomLinks: [
    {
      path: "",
      title: "privacy policy",
    },
    {
      path: "",
      title: "terms of service",
    },
    {
      path: "",
      title: "cookies settings",
    },
  ],
};
