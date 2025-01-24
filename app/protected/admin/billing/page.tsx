// app/admin/billing/page.tsx
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Transaction {
  id: string
  date: string
  amount: number
  type: 'payment' | 'refund'
  status: 'completed' | 'pending' | 'failed'
  customer: string
}

export default function AdminBillingPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx1',
      date: '2024-01-15', 
      amount: 150.00,
      type: 'payment',
      status: 'completed',
      customer: 'John Doe'
    },
    {
      id: 'tx2',
      date: '2024-01-14',
      amount: 75.50,
      type: 'refund', 
      status: 'pending',
      customer: 'Jane Smith'
    }
  ])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices, Payments & Refunds</h1>
        <div className="flex gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            New Invoice
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border hover:bg-gray-50">All</button>
            <button className="px-3 py-1 rounded border hover:bg-gray-50">Payments</button>
            <button className="px-3 py-1 rounded border hover:bg-gray-50">Refunds</button>
          </div>
          <input 
            type="search"
            placeholder="Search transactions..."
            className="px-4 py-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-6 gap-4 font-semibold mb-4 p-2 bg-gray-50">
          <div>Date</div>
          <div>Transaction ID</div>
          <div>Customer</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Status</div>
        </div>

        {transactions.map((tx) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-6 gap-4 p-2 border-b hover:bg-gray-50 cursor-pointer"
          >
            <div>{tx.date}</div>
            <div>{tx.id}</div>
            <div>{tx.customer}</div>
            <div>
              <span className={`px-2 py-1 rounded text-sm ${
                tx.type === 'payment' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {tx.type}
              </span>
            </div>
            <div>${tx.amount.toFixed(2)}</div>
            <div>
              <span className={`px-2 py-1 rounded text-sm ${
                tx.status === 'completed' ? 'bg-green-100 text-green-800' : 
                tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {tx.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Total Revenue</h3>
          <p className="text-2xl text-green-600">$12,450.00</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Pending Payments</h3>
          <p className="text-2xl text-blue-600">$2,150.00</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Pending Refunds</h3>
          <p className="text-2xl text-yellow-600">$750.00</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Failed Transactions</h3>
          <p className="text-2xl text-red-600">$125.00</p>
        </div>
      </div>
    </div>
  )
}
