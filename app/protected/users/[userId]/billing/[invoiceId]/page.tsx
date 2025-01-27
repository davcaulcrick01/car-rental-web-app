'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/ui/table';

interface InvoiceItem {
  description: string;
  amount: number;
}

interface Invoice {
  id: string;
  date: string;
  status: 'PAID' | 'UNPAID';
  paymentMethod: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export default function InvoiceDetailPage() {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await fetch(`/api/invoices/${invoiceId}`);
        const data = await response.json();
        setInvoice(data);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [invoiceId]);

  if (loading) return <div>Loading...</div>;
  if (!invoice) return <div>Invoice not found</div>;

  const handleDownload = () => {
    // Implement invoice download logic
    console.log('Downloading invoice...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice #{invoice.id}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline" 
              size="sm"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-medium">Invoice Date</p>
              <p className="text-sm text-muted-foreground">{invoice.date}</p>
            </div>
            <div>
              <p className="font-medium">Payment Status</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                invoice.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {invoice.status}
              </span>
            </div>
            <div>
              <p className="font-medium">Payment Method</p>
              <p className="text-sm text-muted-foreground">{invoice.paymentMethod}</p>
            </div>
          </div>

          <div className="my-6">
            <h4 className="text-lg font-semibold mb-4">Items</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{`$${item.amount.toFixed(2)}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <div className="flex justify-between w-48">
              <span className="font-medium">Subtotal:</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-48">
              <span className="font-medium">Tax:</span>
              <span>${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-48 text-lg font-bold">
              <span>Total:</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
