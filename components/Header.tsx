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
    <header className="bg-black bg-opacity-90 py-4 fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0 mr-8">
          <Link href="/" className="flex items-center">
            <Image
              src= {`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/logos/GreyZone-Exotics-01.png` }
              alt="GreyZone Exotics Logo"
              width={100}
              height={50}
              className="mr-2"
            />
            <span className="text-xl font-bold text-white">GreyZone Exotics</span>
          </Link>
        </div>

        {/* Middle: Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavItem href="/" label="Home" />
          <DropdownNavItem
            label="Fleet"
            items={fleetCategories}
            isActive={activeDropdown === 'fleet'}
            setActiveDropdown={setActiveDropdown}
            mainLink="/fleet"
          />
          <DropdownNavItem
            label="Services"
            items={serviceCategories}
            isActive={activeDropdown === 'services'}
            setActiveDropdown={setActiveDropdown}
            mainLink="/services"
          />
          <DropdownNavItem
            label="About Us"
            items={aboutUsCategories}
            isActive={activeDropdown === 'about'}
            setActiveDropdown={setActiveDropdown}
            mainLink="/about"
          />
          <NavItem href="/faq" label="FAQ" />
          <NavItem href="/requirements" label="Requirements" />
          <NavItem href="/reserve" label="Reserve Now" />
          <NavItem href="/contact" label="Contact Us" />
        </nav>

        {/* Right: Call to Action buttons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2">
          <Button className="bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1">Call Now</Button>
          <Link href="/login">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black text-sm px-2 py-1">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-2 py-1">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black bg-opacity-90 py-4">
          <nav className="flex flex-col items-center space-y-4">
            <NavItem href="/" label="Home" />
            <MobileDropdownNavItem label="Fleet" items={fleetCategories} mainLink="/fleet" />
            <MobileDropdownNavItem label="Services" items={serviceCategories} mainLink="/services" />
            <MobileDropdownNavItem label="About Us" items={aboutUsCategories} mainLink="/about" />
            <NavItem href="/faq" label="FAQ" />
            <NavItem href="/requirements" label="Requirements" />
            <NavItem href="/reserve" label="Reserve Now" />
            <NavItem href="/contact" label="Contact Us" />
          </nav>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full max-w-xs">Call Now</Button>
            <Link href="/login" className="w-full max-w-xs">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black w-full">Login</Button>
            </Link>
            <Link href="/signup" className="w-full max-w-xs">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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