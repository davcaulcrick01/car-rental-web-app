'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileText, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InsurancePolicy {
  id: string;
  type: string;
  coverageAmount: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'pending';
  documentUrl?: string;
}

export default function InsurancePage() {
  const { userId } = useParams();
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/insurance`);
        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        console.error('Error fetching insurance policies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [userId]);

  const handleUploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`/api/users/${userId}/insurance/documents`, {
        method: 'POST',
        body: formData,
      });
      const newPolicy = await response.json();
      setPolicies([...policies, newPolicy]);
    } catch (error) {
      console.error('Error uploading insurance document:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: <Badge className="bg-green-500">Active</Badge>,
      expired: <Badge className="bg-red-500">Expired</Badge>,
      pending: <Badge className="bg-yellow-500">Pending</Badge>,
    };
    return variants[status as keyof typeof variants];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Insurance Policies</CardTitle>
            <Button onClick={() => document.getElementById('fileInput')?.click()}>
              <Upload className="mr-2" />
              Upload Policy
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files?.[0] && handleUploadDocument(e.target.files[0])}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Type</TableHead>
                <TableHead>Coverage Amount</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.type}</TableCell>
                  <TableCell>${policy.coverageAmount.toLocaleString()}</TableCell>
                  <TableCell>{format(new Date(policy.startDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{format(new Date(policy.endDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{getStatusBadge(policy.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {policy.documentUrl && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={policy.documentUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Insurance Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please review our insurance terms and conditions carefully. Make sure you understand the coverage limits,
              deductibles, and any exclusions that may apply to your rental insurance policy.
            </p>
            <Button variant="outline" asChild>
              <a href="/insurance-terms" target="_blank" rel="noopener noreferrer">
                View Full Terms <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
