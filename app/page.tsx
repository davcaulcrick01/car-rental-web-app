"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight, Instagram, Facebook, Twitter, Star, Award, Zap, MapPin, Phone, Mail } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import cars from '@/lib/cars'; // Importing all cars from car.ts
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Car brands logos with their respective fleet categories
const carBrands = [
  { id: 1, name: "BMW", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/bmw/bmw-x6.png`, link: "/fleet/cars/suv" },
  { id: 2, name: "Tesla", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/tesla/tesla-cybertruck.png`, link: "/fleet/cars/suv" },
  { id: 3, name: "Mercedes", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/mercedes-benz/mercedes-gclass.png`, link: "/fleet/cars/suv" },
  { id: 4, name: "Audi", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/audi/audi.png`, link: "/fleet/cars/sedan" },
  { id: 5, name: "Porsche", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/porsche/porsche-911.png`, link: "/fleet/cars/exotic" },
  { id: 6, name: "Range Rover", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/range-rover/range-rover.png`, link: "/fleet/cars/suv" },
  { id: 7, name: "McLaren", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/mclaren/mclaren.png`, link: "/fleet/cars/exotic" },
  { id: 8, name: "Lamborghini", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/lamborghini/lamborghini.png`, link: "/fleet/cars/exotic" },
  { id: 9, name: "Ferrari", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/ferrari/ferrari.png`, link: "/fleet/cars/exotic" },
  { id: 10, name: "Bentley", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/bentley/bentley.png`, link: "/fleet/cars/luxury" },
  { id: 11, name: "Rolls-Royce", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/rolls-royce/rolls-royce.png`, link: "/fleet/cars/luxury" },
  { id: 13, name: "Maserati", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/maserati/maserati.png`, link: "/fleet/cars/exotic" },
];

const brandLogos = [
  { name: "Mercedes", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/mercedes-benz/mercedes-logo.webp` },
  { name: "BMW", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/bmw/bmw-logo.png` },
  { name: "McLaren", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/mclaren/mclaren-logo.png` },
  { name: "Lamborghini", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/lamborghini/lamborghini-logo.png` },
  { name: "Porsche", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/porsche/porsche-logo.png` },
  { name: "Rolls Royce", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/rolls-royce/rolls-royce-logo.png` },
  { name: "Jeep", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/jeep/jeep-logo.png` },
  { name: "SRT", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/srt/srt-logo.png` },
  { name: "Cadillac", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/cadillac/cadillac-logo.png` },
  { name: "Bentley", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/bentley/bentley-logo.png` },
  { name: "Range Rover", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/range-rover/range-rover-logo.png` },
  { name: "Corvette", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/chevrolet/corvette/corvette-logo.png` },
  { name: "RAM", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/ram/ram-logo.png` },
  { name: "Maserati", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/maserati/maserati-logo.png` },
  { name: "Tesla", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/tesla/tesla-logo.png` },
];

const luxuryCars = [
  { id: 1, image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/car-gallery/mercedes-gle-coupe.jpg`, alt: "Mercedes Luxury Car" },
  { id: 2, image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/car-gallery/mclaren.jpg`, alt: "Mclaren Luxury Car" },
  { id: 3, image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/car-gallery/rollsroyce-cullinan.jpg`, alt: "Cullinan Luxury Car" },
  { id: 4, image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/car-gallery/lamborghini-centenario.jpg`, alt: "Lambo Centenario Car" },
  { id: 5, image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/car-gallery/rollsroyce-phantom.jpg`, alt: "White Luxury Car" },
  { id: 6, image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/car-gallery/mercedes-G63.jpg`, alt: "Silver Luxury Car" },
  { id: 7, image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/car-gallery/lamborghini-aventador.jpg`, alt: "Blue Luxury Car" },
  { id: 8, image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/car-gallery/lamborghini-huracan.jpg`, alt: "Lambo Huracan Car" },
]

const faqItems = [
  { question: "Can international drivers rent exotic cars in the USA?", answer: "Yes, international drivers with a valid license can rent exotic cars in the USA." },
  { question: "In what condition am I required to return the vehicle?", answer: "The car should be returned relatively clean and smoke-free. Excessive damage or uncleanliness may result in additional fees." },
  { question: "How does renting a Lamborghini work?", answer: "Select your car, provide insurance and payment. Our staff will walk you through the car's features when you arrive." },
  { question: "What are the requirements to rent?", answer: "A valid driver's license, credit card, and full insurance are required to rent an exotic car." },
  { question: "Does 777 Exotics have hourly car rentals?", answer: "Please contact us for information on hourly rental options." },
  { question: "Can I rent a car under age 25?", answer: "Age requirements may vary. Please contact us for specific information." },
  { question: "How many miles can I drive?", answer: "Mileage limits vary by vehicle and rental duration. Check the specific terms for each car." },
  { question: "Is there a discount for multi-day rentals?", answer: "Yes, we offer discounts for longer rental periods. Contact us for details." },
  { question: "What payment methods do you accept?", answer: "We accept major credit cards. Cash payments are not accepted for security reasons." },
  { question: "Does 777 Exotics require a security deposit?", answer: "Yes, a security deposit is required and will be refunded upon return of the vehicle in good condition." },
  { question: "How can I make a reservation?", answer: "You can make a reservation online through our website or by calling our customer service." },
  { question: "Do you match competitor prices?", answer: "We offer competitive pricing but don't guarantee price matching due to the unique nature of our vehicles." },
  { question: "Are there any penalties for late returns?", answer: "Late returns may incur additional charges. Please contact us if you need to extend your rental." },
  { question: "Are there any speed restrictions or governors?", answer: "While we don't impose speed restrictions, we expect all drivers to obey traffic laws and drive responsibly." },
  { question: "Can I reserve a Luxury Car for someone else?", answer: "Yes, but the primary driver must meet all rental requirements and be present at pickup." },
  { question: "Do you accept walk-ins and same day reservations?", answer: "Subject to availability, we do accept walk-ins and same day reservations. Booking in advance is recommended." },
]

// Helper function to chunk array into groups
function chunkArray(array: any[], size: number) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

export default function HomePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);

  const categoryTypes = Array.from(new Set(cars.map(car => car.category))).map(category => ({
    name: category,
    image: cars.find(car => car.category === category)?.images[0] || '/placeholder-image.jpg'
  }));

  // Handle mouse down to initiate dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  // Handle mouse move for drag scroll
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Stop dragging on mouse up
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  // Scroll left using button
  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Scroll right using button
  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Automated scroll with smooth continuous behavior
  useEffect(() => {
    if (isPaused || !sliderRef.current) return;
    const autoScroll = setInterval(() => {
      if (sliderRef.current && sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth) {
        sliderRef.current.scrollLeft = 0;
      } else if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 5, behavior: "smooth" });
      }
    }, 10);

    return () => clearInterval(autoScroll);
  }, [isPaused]);

  const handleFollow = () => {
    // Implement follow functionality
    console.log("Follow button clicked");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center text-center">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Luxury Car"
            fill
            objectFit="cover"
            className="absolute inset-0 z-0"
            style={{ maxHeight: '70vh' }}  // Reduced height for a smaller hero section
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Experience Luxury on Wheels</h1>
            <p className="text-xl md:text-2xl mb-8">Rent the finest luxury and exotic cars in Dallas</p>

            {/* Enhanced Search Bar */}
            <div className="relative bg-white text-gray-900 rounded-lg shadow-lg py-4 px-8 mb-8">
              <form action="/fleet/fleet-search" method="GET" className="flex flex-wrap items-center space-x-4">
                {/* Location Input with Shadcn Components */}
                <div className="flex-1">
                  <div className="text-gray-700">Where</div>
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, airport, address or hotel"
                    list="locations"
                    className="w-full"
                  />
                  <datalist id="locations">
                    <option value="Dallas" />
                    <option value="Dallas Love Field Airport" />
                    <option value="Dallas Fort Worth" />
                    <option value="Dallas Area" />
                  </datalist>
                </div>

                {/* Date/Time Pickers */}
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-gray-700">From</div>
                    <Input id="fromDate" type="date" className="w-full" required />
                  </div>

                  <div>
                    <div className="text-gray-700">Time</div>
                    <select id="fromTime" className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="00:00">12:00 AM</option>
                    <option value="00:30">12:30 AM</option>
                    <option value="01:00">1:00 AM</option>
                    <option value="01:30">1:30 AM</option>
                    <option value="02:00">2:00 AM</option>
                    <option value="02:30">2:30 AM</option>
                    <option value="03:00">3:00 AM</option>
                    <option value="03:30">3:30 AM</option>
                    <option value="04:00">4:00 AM</option>
                    <option value="04:30">4:30 AM</option>
                    <option value="05:00">5:00 AM</option>
                    <option value="05:30">5:30 AM</option>
                    <option value="06:00">6:00 AM</option>
                    <option value="06:30">6:30 AM</option>
                    <option value="07:00">7:00 AM</option>
                    <option value="07:30">7:30 AM</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="08:30">8:30 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="09:30">9:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="16:30">4:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                    <option value="22:30">10:30 PM</option>
                    <option value="23:00">11:00 PM</option>
                    <option value="23:30">11:30 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-gray-700">Until</div>
                    <Input id="untilDate" type="date" className="w-full" required />
                  </div>

                  <div>
                    <div className="text-gray-700">Time</div>
                    <select id="untilTime" className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="00:00">12:00 AM</option>
                    <option value="00:30">12:30 AM</option>
                    <option value="01:00">1:00 AM</option>
                    <option value="01:30">1:30 AM</option>
                    <option value="02:00">2:00 AM</option>
                    <option value="02:30">2:30 AM</option>
                    <option value="03:00">3:00 AM</option>
                    <option value="03:30">3:30 AM</option>
                    <option value="04:00">4:00 AM</option>
                    <option value="04:30">4:30 AM</option>
                    <option value="05:00">5:00 AM</option>
                    <option value="05:30">5:30 AM</option>
                    <option value="06:00">6:00 AM</option>
                    <option value="06:30">6:30 AM</option>
                    <option value="07:00">7:00 AM</option>
                    <option value="07:30">7:30 AM</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="08:30">8:30 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="09:30">9:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="16:30">4:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                    <option value="22:30">10:30 PM</option>
                    <option value="23:00">11:00 PM</option>
                    <option value="23:30">11:30 PM</option>
                    </select>
                  </div>
                </div>

               {/* Circular Search Button */}
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full flex items-center justify-center ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18l6-6m0 0l-6-6m6 6H4" />
                </svg>
              </button>
            </form>
          </div>

            {/* Call-to-Action Button */}
            <Link href="/fleet">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 px-8">
                Explore Our Fleet
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Section (View Exclusive Rentals / Reserve Now) */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Image with Hover Effect */}
              <div className="relative group w-full h-[500px] overflow-hidden">
                <Image 
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/lamborghini/lambo-interior.jpg`}
                  alt="Interior View of Lamborghini" 
                  className="rounded-lg object-cover transform transition-transform duration-500 group-hover:scale-110" 
                  fill
                />
                <Link href="/fleet">
                  <Button className="absolute bottom-4 left-4 bg-black text-white px-6 py-2">
                    View Exclusive Rentals
                  </Button>
                </Link>
              </div>

              {/* Second Image with Hover Effect */}
              <div className="relative group w-full h-[500px] overflow-hidden">
                <Image 
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars/lamborghini/lambo-car.jpeg`}
                  alt="Exterior Lamborghini" 
                  className="rounded-lg object-cover transform transition-transform duration-500 group-hover:scale-110" 
                  fill
                />
                <Link href="/reserve">
                  <Button className="absolute bottom-4 left-4 bg-black text-white px-6 py-2">
                    Reserve Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Popular Cars Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Explore Popular Cars</h2>
            <p className="text-center text-lg mb-8">
              From Porsche to McLaren, we have the luxury car rental you're looking for; experience Dallas in style with some of our luxurious cars.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {carBrands.map((brand) => (
                <div key={brand.id} className="flex justify-center items-center">
                  <Link href={brand.link}>
                    <div className="group relative w-full h-full overflow-hidden">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={250}
                        height={230}
                        className="object-contain transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

         {/* Browse by Type Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Browse by Type</h2>
            <div className="relative">
              {/* Scroll Left Button */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                onClick={() => {
                  const container = sliderRef.current;
                  if (container) {
                    container.scrollBy({ left: -300, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronLeft size={28} />
              </button>

              {/* Scroll Right Button */}
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                onClick={() => {
                  const container = sliderRef.current;
                  if (container) {
                    container.scrollBy({ left: 300, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronRight size={28} />
              </button>

              {/* Scrollable List */}
              <div
                className="flex overflow-x-auto space-x-8 py-4 scrollbar-hide scroll-smooth"
                ref={sliderRef}
                onMouseDown={(e) => {
                  if (!sliderRef.current) return;
                  setIsDragging(true);
                  setStartX(e.pageX - sliderRef.current.offsetLeft);
                  setScrollLeft(sliderRef.current.scrollLeft);
                }}
                onMouseMove={(e) => {
                  if (!isDragging || !sliderRef.current) return;
                  e.preventDefault();
                  const x = e.pageX - sliderRef.current.offsetLeft;
                  const walk = (x - startX) * 2;
                  sliderRef.current.scrollLeft = scrollLeft - walk;
                }}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                {categoryTypes.map((type, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-56 transition-transform duration-300 transform hover:scale-105"
                    style={{
                      animation: `slide ${categoryTypes.length * 3}s linear infinite`,
                      animationDelay: `${index * (3 / categoryTypes.length)}s`
                    }}
                  >
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
                      <div className="relative">
                        <Image
                          src={type.image}
                          alt={type.name}
                          width={200}
                          height={120}
                          className="rounded-md object-cover mb-4 transition-transform duration-300 transform hover:scale-110"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-center capitalize">{type.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes slide {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-100%);
              }
            }
            
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </section>

        {/* Slider Section - Our Exclusive Collection */}
        <section className="py-16 bg-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Our Exclusive Collection</h2>

            {/* Navigation Buttons */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full"
              onClick={handleScrollLeft}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full"
              onClick={handleScrollRight}
            >
              <ChevronRight size={24} />
            </button>

            {/* Scrollable Collection */}
            <div
              className="relative flex overflow-x-auto space-x-6"
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              {chunkArray(cars, 6).map((carGroup, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0 grid grid-cols-3 gap-4">
                  {carGroup.map((car, carIndex) => (
                    <div key={`${car.id}-${carIndex}`} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={car.images[0]} // Assuming each car has an `images` array
                        alt={car.name}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                        <p className="text-gray-400 mb-4">{car.year} | ${car.price}/day</p>
                        <Link href={`/booking?car={car.id}`}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Renting a Luxury Car is Easy Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">RENTING A LUXURY CAR IS EASY.</h2>
            <p className="text-xl mb-6">
              You can select from Lamborghini, Ferrari, Rolls Royce and even Classic Cars.
            </p>
            <p className="text-xl mb-6">
              We specialize in exotic car rentals that are a perfect fit for Dallas and Forth Worth.
            </p>
            <p className="text-xl mb-6">
              Selecting the perfect car for your wedding, prom or homecoming gives you the chance to create something special for yourself and your partner.
            </p>
            <p className="text-xl mb-6">
              Our chauffeur services are popular when you want to leave the driving to someone else.
            </p>
            <p className="text-xl">
              GreyZone Exotics is conveniently located 39 minutes away from the DFW Airport, 15 minutes away from the Mckinney Airport. Our Dallas Forth Worth office is adjacent to the famous places and event centers.
            </p>
          </div>
        </section>

        {/* Specials and News Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-700 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">B&W Specials</h3>
              <p className="text-gray-400 mb-4">
                Every week, Black & White offers discounted rates on some of your favorite cars. Click here to check out our current specials.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                View Current Deals
              </Button>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">New Arrivals</h3>
              <p className="text-gray-400 mb-4">
                See the latest inventory! From electric to exotic, we've got the perfect fit for you!
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                View New Arrivals
              </Button>
            </div>
          </div>
        </section>

        {/* Brand Logos Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Our Luxury Brands</h2>
            <p className="text-center text-lg mb-8">
              Experience the pinnacle of automotive engineering with our curated selection of premium brands
            </p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
              {brandLogos.map((brand) => (
                <div key={brand.name} className="flex justify-center items-center">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={100}
                    height={100}
                    className="object-contain"
                    onError={() => console.error(`Failed to load image: ${brand.logo}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add new sections based on your screenshots */}

        {/* Updated FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">My first rental was with GreyZone Exotics. Amazing experience and unbeatable prices.</p>
                <p className="font-semibold">Samuel B.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">Israel Castillo was a pleasure to work with, made everything happen as promised.</p>
                <p className="font-semibold">Nena L.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">WOW!! Unbeatable service, rented Lamborghini and Ferrari, just phenomenal.</p>
                <p className="font-semibold">Natasha G.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Dallas Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">EXPERIENCE DALLAS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <Image src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/logos/dallas-travel.avif`} alt="Dallas Experience" width={300} height={300} className="mx-auto mb-" />
                <h3 className="text-xl font-semibold">Dallas Experience</h3>
              </div>
              <div className="text-center">
                <Image src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/logos/hourly-drives.jpg`} alt="DFW Drives" width={300} height={300} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Dallas Fort Worth Drives</h3>
              </div>
              <div className="text-center">
                <Image src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/logos/24-hour-service.avif`} alt="24 Hour Rentals" width={300} height={300} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold">24 Hour Rentals</h3>
              </div>
              <div className="text-center">
                <Image src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/logos/hot-deals.jpg`} alt="Hot Deals" width={900} height={900} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Hot Deals</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Exotic Car Rental Dallas Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Exotic Car Rental Dallas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Check className="w-6 h-6 text-primary mr-2" />
                    Convenience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>No counter, no long lines. We deliver the car to you at the airport, home, hotel or pick it up from our Beverly Hills location.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-6 h-6 text-primary mr-2" />
                    Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>A wide variety of the latest luxury and exotic cars, always extra clean, always in top condition.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-6 h-6 text-primary mr-2" />
                    Transparency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>If it's not listed online, you don't pay for it. No hidden fees, transparent & ready to roll.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* YouTube and Featured Videos Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Watch Our Latest Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/watch?v=tdhmO2crw-8"
                  title="Bentley Continental GT"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/watch?v=MUJ1oFv6TK8"
                  title="Mercedes G650"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/watch?v=fU5eKGNCT30"
                  title="Rolls Royce Wraith"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        
        {/* Car slide Section */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Experience Luxury</h2>
            <div className="relative">
              <div className="flex overflow-hidden space-x-4">
                {luxuryCars.map((car, index) => (
                  <div
                    key={car.id}
                    className="relative flex-shrink-0 w-1/4 md:w-1/8 transition-all duration-300 ease-in-out group"
                    onMouseEnter={() => setHoveredCar(car.id)}
                    onMouseLeave={() => setHoveredCar(null)}
                    style={{
                      width: hoveredCar === car.id ? '50%' : `${100 / luxuryCars.length}%`,
                      zIndex: hoveredCar === car.id ? 10 : 1,
                      // If the image is in the second half of the array, adjust its position to expand to the left
                      transform: hoveredCar === car.id && index >= luxuryCars.length / 2 ? 'translateX(-50%)' : 'none',
                    }}
                  >
                    {/* Container with fixed height and overflow hidden to create cropped effect */}
                    <div className="relative w-full h-[450px] overflow-hidden">
                      <Image
                        src={car.image}
                        alt={car.alt}
                        width={400}
                        height={600}
                        className={`object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110`}
                        style={{
                          objectPosition: 'center', // Ensure the image is centered in the container
                        }}
                      />
                    </div>
                    {hoveredCar === car.id && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Button
                          variant="secondary"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={handleFollow}
                        >
                          <Instagram className="mr-2 h-4 w-4" /> Follow Us
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center mt-8 text-lg">
              *777 BEATS COMPETITOR PRICING IN MOST CASES, BUT OFFERS NO GUARANTEES DUE TO THE UNIQUE NATURE OF THESE VEHICLES
            </p>
            <p className="text-center mt-8 text-lg">
              Driving from Dallas to Forth Worth is a trip to remember. The desert has many views and unique places to stop along the historic Route 66.
            </p>
            <p className="text-center mt-4 text-2xl font-bold">
              WE INVITE YOU TO EXPERIENCE SOMETHING WONDERFUL WITH THE FINEST CARS IN THE WORLD.
            </p>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Book Your Experience
              </Button>
            </div>
          </div>
        </section>
         {/* Get in Touch Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Get in Touch with Us</h2>
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Booking and Contact Info */}
              <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Book Your Luxury Car</h3>
                <p className="text-gray-300 mb-4">
                  Reserve the luxury or exotic car of your dreams, or contact us for more information. Our staff is ready to assist you in making your experience unforgettable.
                </p>
                <div className="mb-4">
                  <h4 className="text-xl font-semibold mb-2">Address</h4>
                  <p className="text-gray-300">1401 Kirkdale Drive, Melissa, TX 75454</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-xl font-semibold mb-2">Hours</h4>
                  <p className="text-gray-300">Monday - Friday: 9AM - 7PM</p>
                  <p className="text-gray-300">Saturday: 10AM - 6PM</p>
                  <p className="text-gray-300">Sunday: Closed</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Contact</h4>
                  <p className="text-gray-300">Phone: (469) 743-1824</p>
                  <p className="text-gray-300">Email: info@greyzoneexotics.com</p>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                <p className="text-gray-300 mb-4">
                  Have questions or need help with booking? Fill out the form below and we will get back to you as soon as possible.
                </p>
                <div className="bg-gray-700 p-8 rounded-lg mt-8">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-white">First name*</label>
                      <input id="first-name" placeholder="Enter your first name" required className="w-full p-2 mt-1 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white">Email*</label>
                      <input id="email" type="email" placeholder="Enter your email" required className="w-full p-2 mt-1 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white">Phone number*</label>
                      <div className="flex">
                        <select className="w-[80px] p-2 border border-gray-300 rounded-lg">
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+91">+91</option>
                        </select>
                        <input id="phone" type="tel" placeholder="Enter your phone number" className="flex-1 p-2 ml-2 border border-gray-300 rounded-lg" required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white">Subject*</label>
                      <input id="subject" placeholder="Enter the subject" required className="w-full p-2 mt-1 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white">Message*</label>
                      <textarea id="message" placeholder="Enter your message" required className="w-full p-2 mt-1 border border-gray-300 rounded-lg"></textarea>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="recaptcha" className="h-4 w-4 text-blue-600" />
                      <label htmlFor="recaptcha" className="text-white">I'm not a robot</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">SEND</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}