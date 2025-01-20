// components/CarList.tsx
import Image from 'next/image';
import { Button } from './Buttons';
import Link from 'next/link';
import { Car } from '@/lib/cars';  // Import the Car type from our cars.ts file

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <div key={car.id} className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="relative h-48">
            <Image
              src={car.images[0]}
              alt={car.name}
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{car.name}</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-green-400 text-lg">${car.price}/day</span>
              <span className="text-gray-400">{car.category}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-400">Brand:</span>
                <p>{car.brand}</p>
              </div>
              <div>
                <span className="text-gray-400">Type:</span>
                <p>{car.type}</p>
              </div>
              <div>
                <span className="text-gray-400">Engine:</span>
                <p>{car.engine}</p>
              </div>
              <div>
                <span className="text-gray-400">Transmission:</span>
                <p>{car.transmission}</p>
              </div>
            </div>
            <Link href={`/booking?car=${car.id}`}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
