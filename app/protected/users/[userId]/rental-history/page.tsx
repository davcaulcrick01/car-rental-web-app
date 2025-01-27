'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams } from 'next/navigation';

interface RentalRecord {
  id: string;
  carModel: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: 'completed' | 'canceled';
  totalCost: number;
}

export default function RentalHistory() {
  const params = useParams();
  const userId = params.userId as string;
  
  const [dateFilter, setDateFilter] = useState<Date>();
  const [carTypeFilter, setCarTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [rentalHistory, setRentalHistory] = useState<RentalRecord[]>([]);

  const exportToCsv = () => {
    const headers = ['Car Model', 'Start Date', 'End Date', 'Location', 'Status', 'Total Cost'];
    const csvContent = [
      headers.join(','),
      ...rentalHistory.map(rental => [
        rental.carModel,
        format(rental.startDate, 'yyyy-MM-dd'),
        format(rental.endDate, 'yyyy-MM-dd'),
        rental.location,
        rental.status,
        rental.totalCost
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rental-history-${userId}.csv`;
    a.click();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Rental History</h1>
      
      <div className="flex gap-4 mb-6">
        <div>
          <Calendar
            mode="single"
            selected={dateFilter}
            onSelect={setDateFilter}
            className="rounded-md border"
          />
        </div>
        
        <div className="space-y-4">
          <Select value={carTypeFilter} onValueChange={setCarTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by car type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="north">North Branch</SelectItem>
              <SelectItem value="south">South Branch</SelectItem>
              <SelectItem value="east">East Branch</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={exportToCsv}>Export to CSV</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Car Model</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentalHistory.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell>{rental.carModel}</TableCell>
              <TableCell>{format(rental.startDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{format(rental.endDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{rental.location}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  rental.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {rental.status}
                </span>
              </TableCell>
              <TableCell>${rental.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
