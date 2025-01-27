'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PaymentMethod } from '@/services/payment';
import { AddPaymentMethodPayload } from '@/services/payment';
import { getPaymentMethods, addPaymentMethod, deletePaymentMethod, setDefaultPaymentMethod } from '@/services/payment';
import PaymentMethodCard from '@/components/PaymentMethodCard';
import AddPaymentMethodModal from '@/components/AddPaymentMethodModal';
import { Button } from '@/components/ui/button';

export default function PaymentMethodsPage() {
  const { userId } = useParams();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof userId === 'string') {
      loadPaymentMethods();
    }
  }, [userId]);

  const loadPaymentMethods = async () => {
    try {
      setError(null);
      const methods = await getPaymentMethods(userId as string);
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Failed to load payment methods:', error);
      setError('Failed to load payment methods. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPaymentMethod = async (paymentDetails: AddPaymentMethodPayload) => {
    try {
      setError(null);
      const newMethod = await addPaymentMethod(userId as string, paymentDetails);
      setPaymentMethods(prevMethods => [...prevMethods, newMethod]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add payment method:', error);
      setError('Failed to add payment method. Please try again.');
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    try {
      setError(null);
      await deletePaymentMethod(userId as string, paymentMethodId);
      setPaymentMethods(prevMethods => 
        prevMethods.filter(method => method.id !== paymentMethodId)
      );
    } catch (error) {
      console.error('Failed to delete payment method:', error);
      setError('Failed to delete payment method. Please try again.');
    }
  };

  const handleSetDefault = async (paymentMethodId: string) => {
    try {
      setError(null);
      await setDefaultPaymentMethod(userId as string, paymentMethodId);
      setPaymentMethods(prevMethods => prevMethods.map(method => ({
        ...method,
        isDefault: method.id === paymentMethodId
      })));
    } catch (error) {
      console.error('Failed to set default payment method:', error);
      setError('Failed to set default payment method. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          variant="default"
          className="hover:opacity-90"
        >
          Add Payment Method
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            onRemove={handleDeletePaymentMethod}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>

      {paymentMethods.length === 0 && !error && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          <p className="mb-2">No payment methods added yet.</p>
          <p className="text-sm">Click the button above to add your first payment method.</p>
        </div>
      )}
      <AddPaymentMethodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(payload) => {
          // Omit PayPal type since it's not supported in the service
          const { type, ...rest } = payload;
          if (type === 'paypal') return;
          
          // Ensure all required fields are present before submitting
          const paymentMethod = {
            type,
            cardNumber: rest.cardNumber || '',
            cardHolderName: rest.cardHolderName || '',
            expirationDate: rest.expirationDate || '',
            cvv: rest.cvv || '',
            billingAddress: rest.billingAddress || '',
            email: rest.email || ''
          };
          
          handleAddPaymentMethod(paymentMethod);
        }}
      />
    </div>
  );
}
