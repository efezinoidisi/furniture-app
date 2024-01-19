import Link from 'next/link';

type NavLinksProps = {
  navigationLinks: {
    icon?: string;
    path: string;
    title: string;
  }[];
  className?: string;
  linkStyle?: string;
};

export default function NavLinks({
  navigationLinks,
  className = '',
  linkStyle = '',
}: NavLinksProps) {
  return (
    <nav className={className}>
      {navigationLinks.map(({ path, title }) => {
        return (
          <Link href={path} key={title} className={linkStyle}>
            {title}
          </Link>
        );
      })}
    </nav>
  );
}
