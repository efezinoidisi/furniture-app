export default function PageHeader({ title }: { title: string }) {
  return (
    <header className=" min-h-28 mb-7 bg-gradient-to-r from-red-200 via-red-300 to-primary/20 flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-2xl uppercase tracking-wider md:text-3xl">
        {title}
      </h1>
    </header>
  );
}
