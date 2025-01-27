'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import ReportIssueModal from '@/components/ReportIssueModal';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SupportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const userId = params.userId as string;

  const handleSubmitIssue = async (issueDetails: string) => {
    try {
      const response = await fetch('/api/support/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          details: issueDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit issue');
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Support Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
              <p className="text-gray-600 mb-4">
                If you're experiencing any issues or have questions about our services,
                we're here to help. You can report an issue using the button below.
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                Report an Issue
              </Button>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <div className="space-y-2 text-gray-600">
                <p>Email: support@carental.com</p>
                <p>Phone: 1-800-CAR-RENT</p>
                <p>Hours: Monday - Friday, 9:00 AM - 6:00 PM EST</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">How do I modify my reservation?</h3>
                  <p className="text-gray-600">
                    You can modify your reservation through your account dashboard
                    under "My Rentals" section.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">What if I need to cancel?</h3>
                  <p className="text-gray-600">
                    Cancellations made 24 hours before the pickup time are fully refundable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ReportIssueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitIssue}
      />
    </div>
  );
}
