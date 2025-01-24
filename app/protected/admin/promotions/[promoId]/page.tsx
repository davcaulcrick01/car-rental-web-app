// app/admin/promotions/[promoId]/page.tsx
import React from 'react'

interface PromoDetailProps {
  params: { promoId: string }
}

export default async function PromotionDetailPage({ params }: PromoDetailProps) {
  const { promoId } = params
  // Fetch the specific promo by ID if needed

  return (
    <div>
      <h1 className="text-2xl font-bold">Promotion: {promoId}</h1>
      <p>Edit discount, date range, or usage limits, etc.</p>
    </div>
  )
}
