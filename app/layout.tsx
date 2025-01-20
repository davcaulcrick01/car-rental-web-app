import './globals.css'
import PerformanceOptimizer from '@/components/PerformanceOptimizer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PerformanceOptimizer />
        {children}
      </body>
    </html>
  )
}