export default function PageHeader({ title }: { title: string }) {
  return (
    <header className=" min-h-32 md:min-h-44 mb-3 bg-hero bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-2xl capitalize tracking-wider md:text-3xl text-white">
        {title}
      </h1>
    </header>
  );
}
