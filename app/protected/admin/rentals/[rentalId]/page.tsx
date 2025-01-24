// app/admin/rentals/[rentalId]/page.tsx
import React from 'react'

interface RentalPageProps {
  params: { rentalId: string }
}

export default async function RentalDetailPage({ params }: RentalPageProps) {
  const { rentalId } = params

  // e.g. fetch rental details
  // const rental = await fetchRentalById(rentalId)

  return (
    <div>
      <h1 className="text-2xl font-bold">Rental {rentalId} Details</h1>
      <p>Check or edit rental status, dates, etc.</p>
    </div>
  )
}
