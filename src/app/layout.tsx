import Footer from "@/components/footer/footer";
import MainNav from "@/components/navigation/main-nav";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { firaCode, inter, roboto } from "./fonts";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ZFurniture",
  description:
    "Transform your living spaces with ZFurniture. Explore our online catalog today and elevate your home with furniture that reflects your style and personality. Start your journey to a more stylish and comfortable living with ZFurniture.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${firaCode.variable} font-roboto bg-background overflow-x-clip relative after:content-[""] after:absolute after:top-0  after:size-[9rem] md:after:size-[13rem] after:bg-spot-gradient after:blur-3xl after:rounded-[20rem] after:right-0 after:-z-10`}
      >
        <Providers>
          <MainNav />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
