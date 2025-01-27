import React from 'react';
import { PaymentMethod } from '@/types/payment';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PaymentMethodCardProps {
    method: PaymentMethod;
    onRemove: (id: string) => void;
    onSetDefault?: (id: string) => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ 
    method, 
    onRemove,
    onSetDefault 
}) => {
    const getPaymentIcon = () => {
        return <CreditCard className="h-6 w-6 text-gray-600" />;
    };

    const getPaymentDetails = () => {
        return `${method.brand} •••• ${method.lastFourDigits}`;
    };

    return (
        <Card className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {getPaymentIcon()}
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-medium">
                                {`${method.brand} Card`}
                            </h3>
                            {method.isDefault && (
                                <Badge variant="secondary" className="text-xs">
                                    Default
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{getPaymentDetails()}</p>
                        {method.expirationDate && (
                            <p className="text-xs text-gray-400">
                                Expires: {method.expirationDate}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex space-x-2">
                    {!method.isDefault && onSetDefault && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSetDefault(method.id)}
                        >
                            Set Default
                        </Button>
                    )}
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onRemove(method.id)}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default PaymentMethodCard;
