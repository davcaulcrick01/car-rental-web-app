import Image from 'next/image'
import { Button } from './ui/button'
import { BookingForm } from './BookingForm'

export default function VehicleCard({ image, name, price, onSelect }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <Image src={image} alt={name} width={600} height={400} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-blue-400 mb-4">{price}</p>
        <Button onClick={onSelect} className="w-full mb-2">View Details</Button>
        <BookingForm vehicleName={name} price={price} />
      </div>
    </div>
  )
}