import React, { useState } from 'react';
import { AddPaymentMethodPayload } from '@/types/payment';

interface AddPaymentMethodModalProps {
    onSubmit: (payload: AddPaymentMethodPayload) => void;
    onClose: () => void;
    isOpen: boolean;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ onSubmit, onClose, isOpen }) => {
    const [formData, setFormData] = useState<AddPaymentMethodPayload>({
        type: 'credit_card',
        cardNumber: '',
        cardHolderName: '',
        expirationDate: '', 
        billingAddress: '',
        cvv: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({
            type: 'credit_card',
            cardNumber: '',
            cardHolderName: '',
            expirationDate: '',
            billingAddress: '',
            cvv: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Payment Method</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Card Holder Name</label>
                        <input
                            type="text"
                            name="cardHolderName"
                            value={formData.cardHolderName}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                            pattern="[0-9]{16}"
                            maxLength={16}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Expiration Date</label>
                            <input
                                type="text"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleInputChange}
                                className="border rounded p-2"
                                placeholder="MM/YY"
                                pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="border rounded p-2"
                                pattern="[0-9]{3,4}"
                                maxLength={4}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Billing Address</label>
                        <input
                            type="text"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Method
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPaymentMethodModal;
