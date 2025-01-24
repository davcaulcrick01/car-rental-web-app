// app/admin/users/[userId]/page.tsx
import React from 'react'

interface UserDetailProps {
  params: { userId: string }
}

export default async function UserDetailPage({ params }: UserDetailProps) {
  const { userId } = params
  // fetch user details, rental history, etc.

  return (
    <div>
      <h1 className="text-2xl font-bold">User Profile: {userId}</h1>
      {/* Show user info, rentals, etc. */}
    </div>
  )
}
