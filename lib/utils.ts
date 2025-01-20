import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
export type ButtonSize = "default" | "sm" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

// lib/cars.ts
const cars = [
  { id: 1, name: "FORD MUSTANG", year: "1965", price: 299, image: "/images/mustang.jpg", type: "Classic", brand: "Ford" },
  { id: 2, name: "ROLLS-ROYCE PHANTOM", year: "2023", price: 1299, image: "/images/rolls-royce.jpg", type: "Luxury", brand: "Rolls-Royce" },
  { id: 3, name: "MERCEDES-BENZ S-CLASS", year: "2023", price: 499, image: "/images/mercedes.jpg", type: "Sedan", brand: "Mercedes-Benz" },
  { id: 4, name: "PORSCHE 911", year: "2023", price: 799, image: "/images/porsche.jpg", type: "Sport", brand: "Porsche" },
  { id: 5, name: "LAMBORGHINI AVENTADOR", year: "2023", price: 1999, image: "/images/lamborghini.jpg", type: "Sport", brand: "Lamborghini" },
  // Add more cars as needed
];

export default cars;
