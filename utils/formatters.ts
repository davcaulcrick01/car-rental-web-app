export const formatDate = (date: string | Date): string => {
    try {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
};

export const formatCurrency = (amount: number): string => {
    try {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('Invalid amount');
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    } catch (error) {
        console.error('Error formatting currency:', error);
        return '$0.00';
    }
};
