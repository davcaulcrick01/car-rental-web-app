// components/CarFilter.tsx
import { useState, ChangeEvent } from 'react';

interface FilterProps {
  onFilter: (filters: {brand: string, type: string}) => void;
}

export default function CarFilter({ onFilter }: FilterProps) {
  const [filters, setFilters] = useState({ brand: '', type: '' });

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    onFilter({ ...filters, [name]: value });
  };

  return (
    <div className="flex justify-center space-x-4 my-4">
      <select name="brand" onChange={handleInputChange} className="p-2 border">
        <option value="">All Brands</option>
        <option value="Mercedes-Benz">Mercedes-Benz</option>
        <option value="Porsche">Porsche</option>
        <option value="Range Rover">Range Rover</option>
        <option value="Ford">Ford</option>
        <option value="Lamborghini">Lamborghini</option>
      </select>
      
      <select name="type" onChange={handleInputChange} className="p-2 border">
        <option value="">All Types</option>
        <option value="SUV">SUV</option>
        <option value="Sedan">Sedan</option>
        <option value="Sport">Sport</option>
        <option value="Classic">Classic</option>
        <option value="Luxury">Luxury</option>
      </select>
    </div>
  );
}
