// app/admin/rentals/page.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface Rental {
  id: string
  carId: string
  userId: string
  startDate: string
  endDate: string
  status: 'active' | 'completed' | 'cancelled'
}

export default function AdminRentalsPage() {
  const [rentals] = useState<Rental[]>([
    { id: '101', carId: '1', userId: '123', startDate: '2025-01-10', endDate: '2025-01-14', status: 'active' },
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Rentals</h1>
      <table className="mt-4 min-w-full bg-white shadow">
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>Car</th>
            <th>User</th>
            <th>Dates</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="px-2 py-1">
                <Link href={`/admin/rentals/${r.id}`}>{r.id}</Link>
              </td>
              <td className="px-2 py-1">{r.carId}</td>
              <td className="px-2 py-1">{r.userId}</td>
              <td className="px-2 py-1">
                {r.startDate} - {r.endDate}
              </td>
              <td className="px-2 py-1">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
