import Link from 'next/link';

type BreadCrumpProps = {
  items: {
    path: string;
    title: string;
  }[];
};

export default function BreadCrump({ items }: BreadCrumpProps) {
  const list = [
    {
      path: '/',
      title: 'home',
    },
    ...items,
  ];
  const content = list.map(({ path, title }) => (
    <Link
      href={path}
      key={title}
      className='last:pointer-events-none group text-[#ABABAB] last:text-black capitalize hover:text-primary'
    >
      {title} <span className='group-last:hidden'>/</span>
    </Link>
  ));
  return <div className='flex gap-1'>{content}</div>;
}
