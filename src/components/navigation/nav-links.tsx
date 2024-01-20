'use client';
import Link from 'next/link';

type NavLinksProps = {
  navigationLinks: {
    icon?: string;
    path: string;
    title: string;
  }[];
  className?: string;
  linkStyle?: string;
  handleLinkClick?: () => void;
};

export default function NavLinks({
  navigationLinks,
  className = '',
  linkStyle = '',
  handleLinkClick = () => {},
}: NavLinksProps) {
  return (
    <nav className={className}>
      {navigationLinks.map(({ path, title }) => {
        return (
          <Link
            href={path}
            key={title}
            className={`link ${path ? '' : 'pointer-events-none'} ${linkStyle}`}
            onClick={handleLinkClick}
          >
            {title}
          </Link>
        );
      })}
    </nav>
  );
}
