import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function NavLink({ href, children, className = "text-white hover:text-gold transition-colors duration-300" }: NavLinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default NavLink;
