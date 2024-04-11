import Hero from "@/components/homepage/hero";
import SectionFour from "@/components/homepage/section-four";
import SectionOne from "@/components/homepage/section-one";
import SectionThree from "@/components/homepage/section-three";
import Ellipsis from "@/components/loaders/ellipsis";
import { getAllProducts } from "@/lib/actions/data";
import { Suspense } from "react";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <main className="flex flex-col gap-y-10 md:gap-y-16">
      <Hero />
      <Suspense fallback={<Ellipsis />}>
        <SectionOne products={products?.slice(0, 10) || []} />
      </Suspense>
      <SectionThree />
      <SectionFour />
    </main>
  );
}
