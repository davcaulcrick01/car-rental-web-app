'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { getRentalDetails, extendRental, reportRentalIssue } from '@/services/rentals';
import { formatDate, formatCurrency } from '@/utils/formatters';
import ExtendRentalModal from '@/components/ExtendRentalModal';
import ReportIssueModal from '@/components/ReportIssueModal';
import { toast } from '@/components/ui/use-toast';

interface RentalDetails {
  id: string;
  carId: string;
  car: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  insurance: {
    type: string;
    coverage: string;
    price: number;
  };
  status: string;
}

export default function RentalDetailsPage() {
  const params = useParams();
  const userId = params.userId as string;
  const rentalId = params.rentalId as string;
  
  const [rental, setRental] = useState<RentalDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    loadRentalDetails();
  }, [userId, rentalId]);

  const loadRentalDetails = async () => {
    try {
      const details = await getRentalDetails(userId, rentalId);
      setRental({
        ...details,
        startDate: new Date(details.startDate),
        endDate: new Date(details.endDate)
      });
    } catch (err) {
      setError('Failed to load rental details');
    } finally {
      setLoading(false);
    }
  };

  const handleExtendRental = async (additionalDays: number) => {
    try {
      await extendRental(userId, rentalId, additionalDays);
      await loadRentalDetails();
      setIsExtendModalOpen(false);
    } catch (err) {
      setError('Failed to extend rental');
    }
  };

  const handleReportIssue = async (issueDetails: { type: string; description: string }) => {
    try {
      await reportRentalIssue(userId, rentalId, issueDetails);
      setIsReportModalOpen(false);
      toast({
        title: "Success",
        description: "Issue reported successfully"
      });
    } catch (err) {
      setError('Failed to report issue');
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (!rental) return <div className="p-8">Rental not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Rental Details</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <p>{error}</p>
        </Alert>
      )}

      <Card className="mb-6">
        <h2 className="text-xl mb-4">Vehicle Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Vehicle</p>
            <p>{`${rental.car.year} ${rental.car.make} ${rental.car.model}`}</p>
          </div>
          <div>
            <p className="font-semibold">License Plate</p>
            <p>{rental.car.licensePlate}</p>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl mb-4">Rental Period</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Start Date</p>
            <p>{formatDate(rental.startDate)}</p>
          </div>
          <div>
            <p className="font-semibold">End Date</p>
            <p>{formatDate(rental.endDate)}</p>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl mb-4">Insurance Details</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">Type:</span> {rental.insurance.type}</p>
          <p><span className="font-semibold">Coverage:</span> {rental.insurance.coverage}</p>
          <p><span className="font-semibold">Price:</span> {formatCurrency(rental.insurance.price)}</p>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button onClick={() => setIsExtendModalOpen(true)}>Extend Rental</Button>
        <Button variant="outline" onClick={() => setIsReportModalOpen(true)}>Report Issue</Button>
      </div>

      <ExtendRentalModal
        isOpen={isExtendModalOpen}
        onClose={() => setIsExtendModalOpen(false)}
        handleSubmit={handleExtendRental}
        currentEndDate={rental.endDate}
      />

      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={(issueDetails: string) => handleReportIssue({ 
          type: 'general',
          description: issueDetails 
        })}
      />
    </div>
  );
}
