import ClientLayout from '../ClientLayout'
import Layout from './Layout'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      <Layout>{children}</Layout>
    </ClientLayout>
  )
}