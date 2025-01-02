'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface BookingFormProps {
  vehicleName: string;
  price: string;
}

export function BookingForm({ vehicleName, price }: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', { vehicleName, price, startDate, endDate, name, email, phone });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm uppercase font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out"
      >
        Book Now
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-800 text-white p-6 rounded-lg relative">
          <h2 className="text-2xl font-bold mb-4">Book {vehicleName}</h2>
          <p className="mb-4">Price: {price}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="bg-gray-700 text-white"
              />
              <Input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-700 text-white"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-700 text-white"
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-gray-700 text-white"
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Confirm Booking
            </Button>
          </form>
          <DialogClose
            className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer"
            aria-label="Close dialog"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
