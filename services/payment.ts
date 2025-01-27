export interface PaymentMethod {
    id: string;
    type: 'credit_card' | 'debit_card';
    cardNumber: string; 
    cardHolderName: string;
    expirationDate: string;
    isDefault: boolean;
}

export interface AddPaymentMethodPayload {
    type: 'credit_card' | 'debit_card';
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    billingAddress: string;
    cvv: string;
}

export const getPaymentMethods = async (userId: string): Promise<PaymentMethod[]> => {
    const response = await fetch(`/api/users/${userId}/payment-methods`);
    if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
    }
    return response.json();
};

export const addPaymentMethod = async (userId: string, paymentDetails: AddPaymentMethodPayload): Promise<PaymentMethod> => {
    const response = await fetch(`/api/users/${userId}/payment-methods`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
    });
    if (!response.ok) {
        throw new Error('Failed to add payment method');
    }
    return response.json();
};

export const deletePaymentMethod = async (userId: string, paymentMethodId: string): Promise<void> => {
    const response = await fetch(`/api/users/${userId}/payment-methods/${paymentMethodId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete payment method');
    }
};

export const setDefaultPaymentMethod = async (userId: string, paymentMethodId: string): Promise<void> => {
    const response = await fetch(`/api/users/${userId}/payment-methods/${paymentMethodId}/default`, {
        method: 'PUT',
    });
    if (!response.ok) {
        throw new Error('Failed to set default payment method');
    }
};
