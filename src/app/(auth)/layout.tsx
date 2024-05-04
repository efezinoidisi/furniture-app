import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-10 pb-5 page-size">
      <div className="hidden md:block w-full">
        <Image
          src={"/assets/images/auth.png"}
          width={600}
          height={700}
          alt=""
          className="object-cover w-full h-full bg-blend-lighten"
          unoptimized
        />
      </div>
      {children}
    </div>
  );
}
