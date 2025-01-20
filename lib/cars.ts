export interface Car {
  id: number;
  name: string;
  brand: string;
  type: string;
  category: string;
  year: number;
  price: number;
  threeDaySpecial: number;
  description: string;
  transmission: string;
  engine: string;
  topSpeed: string;
  images: string[];
  rating?: number;
  logo: string;
  image: string;
  alt: string;
  features?: string[];
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Luxury Car 1",
    category: "luxury",
    image: "car1.jpg",
    alt: "Luxury Car 1",
    brand: "Rolls-Royce",
    type: "Sedan",
    year: 2023,
    price: 1500,
    threeDaySpecial: 4000,
    description: "The epitome of luxury motoring, featuring unparalleled comfort and sophistication.",
    transmission: "8-speed automatic",
    engine: "6.75L V12",
    topSpeed: "155 mph",
    images: [
      "/images/cars/phantom-1.jpg",
      "/images/cars/phantom-2.jpg",
      "/images/cars/phantom-3.jpg"
    ],
    rating: 5,
    logo: "/images/logos/rolls-royce.png",
    features: ["Leather seats", "Premium sound system", "GPS Navigation"]
  },
  // Add more cars as needed
];

export default cars;