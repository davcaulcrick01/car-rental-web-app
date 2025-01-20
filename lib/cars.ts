export interface Car {
  id: number;
  name: string;
  category: string;
  image: string;
  alt: string;
  description?: string;
  price?: number;
  features?: string[];
  brand: string;
  type: string;
  engine: string;
  transmission: string;
  year: number;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Luxury Car 1",
    category: "luxury",
    image: "car1.jpg",
    alt: "Luxury Car 1",
    description: "A luxurious vehicle for a premium experience",
    price: 500,
    features: ["Leather seats", "Premium sound system", "GPS Navigation"],
    brand: "Mercedes",
    type: "Sedan",
    engine: "V8 4.0L",
    transmission: "Automatic",
    year: 2023
  },
  // Add more cars as needed
];

export default cars;