export interface PaymentMethod {
    id: string;
    type: 'credit_card' | 'debit_card' | 'paypal';
    cardNumber?: string; 
    cardHolderName?: string;
    expirationDate?: string;
    billingAddress?: string;
    isDefault: boolean;
    lastFourDigits?: string;
    brand?: string;
    email?: string; // For PayPal
}

export interface AddPaymentMethodPayload {
    type: 'credit_card' | 'debit_card' | 'paypal';
    cardNumber?: string;
    cardHolderName?: string;
    expirationDate?: string;
    billingAddress?: string;
    email?: string; // For PayPal
    cvv?: string; // Required for card payments but not stored
}

export interface PaymentTransaction {
    id: string;
    paymentMethodId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    metadata?: Record<string, any>;
}

export interface BillingAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber?: string;
}

export interface PaymentError {
    code: string;
    message: string;
    details?: Record<string, any>;
}
