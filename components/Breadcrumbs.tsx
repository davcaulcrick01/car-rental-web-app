import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            <Link href={item.href} className={`ml-1 text-sm font-medium ${index === items.length - 1 ? 'text-gray-500' : 'text-green-600 hover:text-green-700'}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}