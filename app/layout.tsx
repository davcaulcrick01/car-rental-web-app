import './globals.css'
import PerformanceOptimizer from '@/components/PerformanceOptimizer'
import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="icon" 
          href={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/public/favicon.ico`}
        />
      </head>
      <body>
        <PerformanceOptimizer />
        {children}
      </body>
    </html>
  )
}