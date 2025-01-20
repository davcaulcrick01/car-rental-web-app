import Image from 'next/image'
import Link from 'next/link'
import { BookingForm } from './BookingForm'

interface VehicleCardProps {
  image: string;
  name: string;
  price: number;
  description?: string;
  onSelect: (vehicleId: string) => void;
}

export default function VehicleCard({ 
  image, 
  name, 
  price, 
  description, 
  onSelect 
}: VehicleCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <Image 
        src={image} 
        alt={name} 
        width={600} 
        height={400} 
        className="w-full h-64 object-cover" 
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-green-400 text-lg mb-4">${price}/day</p>
        {description && (
          <p className="text-gray-400 mb-4">{description}</p>
        )}
        <button
          onClick={() => onSelect(name)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Select Vehicle
        </button>
      </div>
    </div>
  );
}