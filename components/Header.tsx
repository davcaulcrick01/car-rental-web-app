"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

const fleetCategories = [
  { name: "Classic Cars", path: "/fleet/cars/classic" },
  { name: "Luxury Fleet", path: "/fleet/cars/luxury" },
  { name: "Sedans", path: "/fleet/cars/sedan" },
  { name: "Convertibles", path: "/fleet/cars/convertible" },
  { name: "Super Cars", path: "/fleet/cars/super" },
  { name: "SUVs", path: "/fleet/cars/suv" },
  { name: "Exotic Cars", path: "/fleet/cars/exotic" }
]

const serviceCategories = [
  { name: "Chauffeur Services", path: "/services/chauffeur-services" },
  { name: "Airport Transfers", path: "/services/airport-transfers" },
  { name: "Wedding Car Rentals", path: "/services/wedding-services" },
  { name: "Corporate Events", path: "/services/corporate-events" },
  { name: "Film & Photo Shoots", path: "/services/photoshoot-rentals" },
  { name: "Ecotic Tours", path: "/services/exotic-tours" },
  { name: "Long Term Rentals", path: "/services/long-term-rentals" },
  { name: "Luxury Rentals", path: "/services/luxury-rentals" },
]

const aboutUsCategories = [
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Car Rental
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <Link href="/fleet" className="hover:text-gray-600">Fleet</Link>
            <Link href="/about" className="hover:text-gray-600">About</Link>
            <Link href="/contact" className="hover:text-gray-600">Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-white hover:text-gray-300 transition-colors text-sm whitespace-nowrap">
      {label}
    </Link>
  )
}

function DropdownNavItem({ label, items, isActive, setActiveDropdown, mainLink }: {
  label: string;
  items: { name: string; path: string }[];
  isActive: boolean;
  setActiveDropdown: (dropdown: string | null) => void;
  mainLink: string;
}) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label.toLowerCase());
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={mainLink} className="text-white hover:text-gray-300 transition-colors flex items-center text-sm whitespace-nowrap">
        {label} <ChevronDown className="ml-1 h-4 w-4" />
      </Link>
      {isActive && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileDropdownNavItem({ label, items, mainLink }: {
  label: string;
  items: { name: string; path: string }[];
  mainLink: string;
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Link href={mainLink} className="text-white hover:text-gray-300 transition-colors text-lg">
          {label}
        </Link>
        <button
          className="text-white hover:text-gray-300 transition-colors p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 w-full bg-gray-800">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}