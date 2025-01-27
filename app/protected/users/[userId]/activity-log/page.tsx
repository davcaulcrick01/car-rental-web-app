'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: any;
  createdAt: string;
  ipAddress: string;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
  };
}

interface DateRange {
  from: Date | null;
  to: Date | null;
}

export default function ActivityLogPage() {
  const { userId } = useParams();
  const [activityLogs, setActivityLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });
  const [activityType, setActivityType] = useState('all');

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const response = await fetch(`/api/audit-logs?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch activity logs');
        }

        const data = await response.json();
        setActivityLogs(data);
        setFilteredLogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityLogs();
  }, [userId]);

  useEffect(() => {
    let filtered = [...activityLogs];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.createdAt);
        const fromDate = dateRange.from as Date;
        const toDate = dateRange.to as Date;
        return logDate >= fromDate && logDate <= toDate;
      });
    }

    // Filter by activity type
    if (activityType !== 'all') {
      filtered = filtered.filter(log => log.action === activityType);
    }

    setFilteredLogs(filtered);
  }, [searchTerm, dateRange, activityType, activityLogs]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>User Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="rental">Rental</SelectItem>
                  <SelectItem value="settings">Settings</SelectItem>
                </SelectContent>
              </Select>
              <DateRangePicker
                from={dateRange.from}
                to={dateRange.to}
                onSelect={setDateRange}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {format(new Date(log.createdAt), 'MMM dd, yyyy HH:mm:ss')}
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
                  <TableCell>
                    {`${log.deviceInfo.browser} on ${log.deviceInfo.os}`}
                  </TableCell>
                  <TableCell>
                    <pre className="text-sm whitespace-pre-wrap">
                      {JSON.stringify(log.changes, null, 2)}
                    </pre>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
