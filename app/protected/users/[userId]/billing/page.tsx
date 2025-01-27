'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import Link from 'next/link';

interface Invoice {
  id: string;
  amount: number;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
  pdfUrl: string;
}

export default function BillingPage({ params }: { params: { userId: string } }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // TODO: Fetch invoices from API
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Billing History</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>{format(invoice.dueDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell>
                <span className={`capitalize ${
                  invoice.status === 'paid' ? 'text-green-600' :
                  invoice.status === 'overdue' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(invoice.pdfUrl, '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Link href={`/protected/users/${params.userId}/billing/${invoice.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {invoices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No billing history available
        </div>
      )}
    </div>
  );
}
