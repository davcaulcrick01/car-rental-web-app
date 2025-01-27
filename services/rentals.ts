interface RentalDetails {
  id: string;
  carId: string;
  car: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  insurance: {
    type: string;
    coverage: string;
    price: number;
  };
  status: string;
}

export const getRentalDetails = async (userId: string, rentalId: string): Promise<RentalDetails> => {
    const response = await fetch(`/api/users/${userId}/rentals/${rentalId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch rental details');
    }
    return response.json();
};

export const extendRental = async (userId: string, rentalId: string, additionalDays: number): Promise<void> => {
    const response = await fetch(`/api/users/${userId}/rentals/${rentalId}/extend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ additionalDays }),
    });

    if (!response.ok) {
        throw new Error('Failed to extend rental');
    }
};

export const reportRentalIssue = async (userId: string, rentalId: string, issueDetails: { type: string; description: string }): Promise<void> => {
    const response = await fetch(`/api/users/${userId}/rentals/${rentalId}/issues`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueDetails),
    });

    if (!response.ok) {
        throw new Error('Failed to report rental issue');
    }
};
