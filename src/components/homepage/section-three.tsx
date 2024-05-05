"use client";
import { Icons } from "@/lib/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

if (typeof window !== undefined) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SectionThree() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".img", {
        scale: 0.5,
        opacity: 0.5,
        rotation: 45,
      });
      gsap.to(".img", {
        scale: 1,
        opacity: 1,
        rotation: 0,
        scrollTrigger: {
          trigger: ".img",
          start: "10px bottom",
          end: "bottom bottom",
          scrub: true,
          // markers: true,
        },
        duration: 5,
      });
    },
    { scope: ref }
  );

  return (
    <section className='grid md:grid-cols-2 gap-y-4 gap-x-5 page-size relative after:content-[""] after:absolute after:top-32 lg:after:top-96 after:w-52 after:h-32 after:bg-spot-gradient after:blur-3xl after:rounded-full after:-left-32 py-10 '>
      <div className='text-center md:text-left flex flex-col gap-y-3 bg-[url("/assets/images/Ellipse2.svg")] bg-no-repeat bg-left-top'>
        <h3 className='capitalize bg-[url("/assets/images/arrow4.svg")] bg-no-repeat bg-right-bottom bg-[length:4rem] pt-8 w-fit relative text-center md:text-left text-2xl md:text-[2rem] text-pretty font-bold leading-9'>
          enjoy our latest furniture trends and style
        </h3>

        <p className=" md:text-lg lg:text-xl lg:leading-9 md:leading-8 leading-7">
          Shop our curated collection of furniture items and stay ahead of the
          style game
        </p>
        <div className="md:mt-14 mb-6 flex flex-col md:flex-row gap-y-3">
          <div>
            <h4 className="font-bold font-inter text-xl capitalize pb-3">
              quality
            </h4>
            <p>
              Our furniture items are crafted with the highest wood quality and
              attention to details
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className='font-bold font-inter text-xl capitalize  bg-[url("/assets/images/Ellipse2.svg")] bg-right-bottom pb-3 px-8 bg-no-repeat  self-center w-fit md:self-start'>
              style
            </h4>
            <p>
              Express your unique style with our wide range of trendy items.
            </p>
          </div>
        </div>
      </div>
      <div className="row-span-2 h-[22rem] md:h-full " ref={ref}>
        <Image
          src={"/assets/images/boy1.png"}
          alt=""
          width={750}
          height={800}
          unoptimized
          className="rounded-[3rem] object-cover w-full h-full img"
        />
      </div>
      <div className="col-start-1 md:items-start justify-center  flex md:justify-end pr-5">
        <Link
          href={""}
          className="bg-black text-white px-5 py-2 flex gap-3 capitalize w-fit mt-4"
        >
          explore
          <Icons.right />
        </Link>
      </div>
    </section>
  );
}
