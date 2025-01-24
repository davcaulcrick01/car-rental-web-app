// app/admin/users/page.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

export default function AdminUsersPage() {
  const [users] = useState<User[]>([
    { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'customer' },
    { id: 'u2', name: 'Bob', email: 'bob@example.com', role: 'admin' },
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <table className="mt-4 min-w-full bg-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="px-2 py-1">
                <Link href={`/admin/users/${u.id}`}>{u.name}</Link>
              </td>
              <td className="px-2 py-1">{u.email}</td>
              <td className="px-2 py-1">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
