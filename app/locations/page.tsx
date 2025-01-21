"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
// Verify if LuxuryCarRentalLanding is a named or default export in your Layout component.
// If it's a default export, adjust the import accordingly.
import { LuxuryCarRentalLanding } from "@/components/Layout";
import Header from "@/components/Header";

// Safely handle the environment variable to avoid undefined values.
// You can replace the fallback URL with a valid default or an empty string.
const S3_BUCKET_URL = process.env.NEXT_PUBLIC_S3_BUCKET_URL || "";
const BASE_PATH = `${S3_BUCKET_URL}/car_images/images/locations`;

// Location data with dynamic image paths
const locations = [
  {
    id: 1,
    city: "Los Angeles",
    address: "1401 Kirkdale Drive Melissa, TX 75454",
    phone: "+1 (469) 743-1824",
    image: `${BASE_PATH}/los-angeles.jpg`,
  },
  {
    id: 2,
    city: "Dallas",
    address: "Downtown Dallas",
    phone: "+1 (469) 743-1824",
    image: `${BASE_PATH}/new-york.jpg`,
  },
  {
    id: 3,
    city: "Mckinney Airport",
    address: "Mckinney Airport",
    phone: "+1 (469) 743-1824",
    image: `${BASE_PATH}/miami.jpg`,
  },
  {
    id: 4,
    city: "Reunion Tower",
    address: "Reunion Tower Dallas",
    phone: "+1 (702) 555-3456",
    image: `${BASE_PATH}/las-vegas.jpg`,
  },
];

export default function LocationsPage() {
  return (
    <LuxuryCarRentalLanding>
      <Header /> {/* Using the Header component */}
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
            Our Locations
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={location.image}
                  alt={location.city}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{location.city}</h3>
                  <p className="text-gray-400 mb-2">{location.address}</p>
                  <p className="text-gray-400 mb-6">{location.phone}</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm uppercase font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out">
                    Get Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LuxuryCarRentalLanding>
  );
}
