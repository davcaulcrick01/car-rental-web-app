'use client'

import React from 'react'
import Link from 'next/link'
import { FaHome, FaCar, FaTools, FaShieldAlt, FaCarCrash, FaCalendarAlt, FaUsers, FaUserTie, FaMapMarkerAlt, FaCreditCard, FaTag, FaPercent, FaBullhorn, FaBell, FaChartBar, FaList, FaCog, FaPlug, FaServer, FaDatabase } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name?: string
  role: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  // Protect admin routes
  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/protected/admin',
      icon: FaHome
    },
    {
      section: 'Fleet Management',
      items: [
        { label: 'Cars', href: '/protected/admin/cars', icon: FaCar },
        { label: 'Maintenance', href: '/protected/admin/maintenance', icon: FaTools },
        { label: 'Insurance', href: '/protected/admin/insurance', icon: FaShieldAlt },
        { label: 'Damage Reports', href: '/protected/admin/insurance/damage-reports', icon: FaCarCrash }
      ]
    },
    {
      section: 'Business',
      items: [
        { label: 'All Rentals', href: '/protected/admin/rentals', icon: FaCalendarAlt },
        { label: 'All Users', href: '/protected/admin/users', icon: FaUsers },
        { label: 'All Staff', href: '/protected/admin/staff', icon: FaUserTie },
        { label: 'All Locations', href: '/protected/admin/locations', icon: FaMapMarkerAlt }
      ]
    },
    {
      section: 'Finance',
      items: [
        { label: 'Billing', href: '/protected/admin/billing', icon: FaCreditCard },
        { label: 'Pricing', href: '/protected/admin/pricing', icon: FaTag },
        { label: 'All Promotions', href: '/protected/admin/promotions', icon: FaPercent }
      ]
    },
    {
      section: 'Marketing',
      items: [
        { label: 'Marketing Campaigns', href: '/protected/admin/marketing', icon: FaBullhorn },
        { label: 'Notifications', href: '/protected/admin/notifications', icon: FaBell }
      ]
    },
    {
      section: 'System',
      items: [
        { label: 'Reports', href: '/protected/admin/reports', icon: FaChartBar },
        { label: 'Logs', href: '/protected/admin/logs', icon: FaList },
        { label: 'Settings', href: '/protected/admin/settings', icon: FaCog },
        { label: 'Integrations', href: '/protected/admin/integrations', icon: FaPlug },
        { label: 'System Health', href: '/protected/admin/system', icon: FaServer },
        { label: 'Database', href: '/protected/admin/system/database', icon: FaDatabase }
      ]
    }
  ]

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-400">Welcome, {user?.name || user.email}</p>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} className="py-2">
              {item.section ? (
                <>
                  <div className="text-gray-400 text-sm px-4 mb-1">{item.section}</div>
                  {item.items.map((subItem, subIndex) => {
                    const Icon = subItem.icon
                    return Icon ? (
                      <Link 
                        key={subIndex}
                        href={subItem.href || '#'}
                        className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                      >
                        {Icon && <Icon size={20} />}
                        <span className="font-medium">{subItem.label}</span>
                      </Link>
                    ) : null
                  })}
                </>
              ) : (
                item.icon && (
                  <Link
                    href={item.href || '#'}
                    className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  )
}
