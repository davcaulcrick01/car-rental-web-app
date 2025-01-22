// components/CarList.tsx
import Image from 'next/image';
import Link from 'next/link';

interface Car {
  id: string;
  image: string;
  name: string;
  year: number;
  price: number;
  type: string;
  category: string;
}

export default function CarList({ cars }: { cars: Car[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <div key={car.id} className="bg-gray-800 p-4 rounded-lg">
          <Image src={car.image} alt={car.name} width={600} height={400} />
          <h3 className="text-xl font-bold">{car.name}</h3>
          <p>{car.year} | ${car.price}/day</p>
          <p className="text-gray-400">{car.category}</p>
          <Link href={`/fleet/cars/${car.type}`} passHref>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
