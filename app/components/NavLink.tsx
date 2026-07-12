import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  match?: RegExp;
  children: ReactNode;
}

export default function NavLink({
  href,
  className = '',
  activeClassName = 'active',
  match,
  children,
}: NavLinkProps) {
  const location = useLocation();

  const active = match ? !!location.pathname.match(match) : location.pathname.startsWith(href);

  return (
    <Link to={href} className={`${className} ${active ? activeClassName : ''}`}>
      {children}
    </Link>
  );
}
