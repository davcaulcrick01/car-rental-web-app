import Link from 'next/link'

export function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-white hover:text-gold transition-colors duration-300">
      {children}
    </Link>
  )
}
