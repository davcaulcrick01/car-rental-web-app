'use client';

import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from 'react';

interface ErrorLog {
  title: string;
  message: string;
  environment: string;
  timestamp: string;
}

const ErrorLogsPage = () => {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Sentry
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
    });

    // Fetch errors from Sentry
    const fetchErrors = async () => {
      try {
        const response = await fetch('/api/sentry/issues');
        const data = await response.json();
        setErrors(data);
      } catch (error) {
        console.error('Failed to fetch error logs:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    fetchErrors();
  }, []);

  if (loading) {
    return <div>Loading error logs...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Error Logs</h1>
      <div className="space-y-4">
        {errors.map((error, index) => (
          <div key={index} className="border rounded p-4 bg-white shadow">
            <h2 className="font-semibold text-red-600">{error.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{error.message}</p>
            <div className="mt-2 text-xs text-gray-500">
              <span>Environment: {error.environment}</span>
              <span className="ml-4">Timestamp: {new Date(error.timestamp).toLocaleString()}</span>
            </div>
          </div>
        ))}
        {errors.length === 0 && (
          <p className="text-gray-500">No errors found.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorLogsPage;
