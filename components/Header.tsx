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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black bg-opacity-90 py-2' : 'bg-black bg-opacity-90 py-4'
    }`}>
      <div className="max-w-[2000px] mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex-shrink-0 mr-4 md:mr-8">
          <Link href="/" className="flex items-center">
            <div className="relative w-[60px] h-[30px] md:w-[80px] md:h-[40px] lg:w-[100px] lg:h-[50px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/logos/GreyZone-Exotics-01.png`}
                alt="GreyZone Exotics Logo"
                fill
                className="object-contain transition-all duration-300"
              />
            </div>
            <span className="hidden sm:block font-bold text-white ml-2 transition-all duration-300 text-sm md:text-base lg:text-lg">
              GreyZone Exotics
            </span>
          </Link>
        </div>

        {/* Middle: Navigation (Desktop) */}
        <nav className="hidden xl:flex items-center space-x-4 lg:space-x-6">
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
        <div className="hidden xl:flex items-center space-x-2">
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm">
            Call Now
          </Button>
          <Link href="/login">
            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black text-xs sm:text-sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="xl:hidden text-white p-2" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-black bg-opacity-90">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <NavItem href="/" label="Home" />
            <MobileDropdownNavItem label="Fleet" items={fleetCategories} mainLink="/fleet" />
            <MobileDropdownNavItem label="Services" items={serviceCategories} mainLink="/services" />
            <MobileDropdownNavItem label="About Us" items={aboutUsCategories} mainLink="/about" />
            <NavItem href="/faq" label="FAQ" />
            <NavItem href="/requirements" label="Requirements" />
            <NavItem href="/reserve" label="Reserve Now" />
            <NavItem href="/contact" label="Contact Us" />
          </nav>
          <div className="flex flex-col px-4 pb-4 space-y-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Call Now</Button>
            <Link href="/login" className="w-full">
              <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black w-full">
                Login
              </Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">Sign Up</Button>
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
    }, 300);
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
        <Link href={mainLink} className="text-white hover:text-gray-300 transition-colors text-base">
          {label}
        </Link>
        <button
          className="text-white hover:text-gray-300 transition-colors p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 w-full bg-gray-800 rounded-md">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 first:rounded-t-md last:rounded-b-md"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}