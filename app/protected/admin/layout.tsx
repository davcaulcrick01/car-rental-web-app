'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  FaHome,
  FaCar,
  FaTools,
  FaShieldAlt,
  FaCarCrash,
  FaCalendarAlt,
  FaUsers,
  FaUserTie,
  FaMapMarkerAlt,
  FaCreditCard,
  FaTag,
  FaPercent,
  FaBullhorn,
  FaBell,
  FaChartBar,
  FaList,
  FaCog,
  FaPlug,
  FaServer,
  FaDatabase,
} from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { createAuditLog } from '@/app/actions/audit';

interface AdminUser {
  userId: string;
  role: 'ADMIN' | 'USER';
  name?: string;
  email?: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const validateAdmin = async () => {
      if (!authLoading) {
        try {
          if (!user) {
            router.replace('/login')
            return
          }

          if (user.role !== 'ADMIN') {
            await createAuditLog({
              userId: user.userId,
              action: 'UNAUTHORIZED_ACCESS',
              entityType: 'ADMIN_AREA',
              entityId: 'admin',
              changes: { status: 'DENIED', reason: 'Not admin user' }
            });
            router.replace(`/protected/users/${user.userId}`)
            return
          }

          await createAuditLog({
            userId: user.userId,
            action: 'ADMIN_ACCESS',
            entityType: 'ADMIN_AREA',
            entityId: 'admin',
            changes: { status: 'SUCCESS' }
          });
        } catch (error) {
          console.error('Admin validation failed:', error);
          router.replace('/login')
        }
      }
    };

    validateAdmin();
  }, [user, authLoading, router]);

  // Remove these checks since we handle them in the useEffect
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Only show content if we have a valid admin user
  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/protected/admin',
      icon: FaHome,
    },
    {
      section: 'Fleet Management',
      items: [
        { label: 'Cars', href: '/protected/admin/cars', icon: FaCar },
        { label: 'Maintenance', href: '/protected/admin/maintenance', icon: FaTools },
        { label: 'Insurance', href: '/protected/admin/insurance', icon: FaShieldAlt },
        { label: 'Damage Reports', href: '/protected/admin/insurance/damage-reports', icon: FaCarCrash },
      ],
    },
    {
      section: 'Business',
      items: [
        { label: 'All Rentals', href: '/protected/admin/rentals', icon: FaCalendarAlt },
        { label: 'All Users', href: '/protected/admin/users', icon: FaUsers },
        { label: 'All Staff', href: '/protected/admin/staff', icon: FaUserTie },
        { label: 'All Locations', href: '/protected/admin/locations', icon: FaMapMarkerAlt },
      ],
    },
    {
      section: 'Finance',
      items: [
        { label: 'Billing', href: '/protected/admin/billing', icon: FaCreditCard },
        { label: 'Pricing', href: '/protected/admin/pricing', icon: FaTag },
        { label: 'All Promotions', href: '/protected/admin/promotions', icon: FaPercent },
      ],
    },
    {
      section: 'Marketing',
      items: [
        { label: 'Marketing Campaigns', href: '/protected/admin/marketing', icon: FaBullhorn },
        { label: 'Notifications', href: '/protected/admin/notifications', icon: FaBell },
      ],
    },
    {
      section: 'System',
      items: [
        { label: 'Reports', href: '/protected/admin/reports', icon: FaChartBar },
        { label: 'Logs', href: '/protected/admin/logs', icon: FaList },
        { label: 'Settings', href: '/protected/admin/settings', icon: FaCog },
        { label: 'Integrations', href: '/protected/admin/integrations', icon: FaPlug },
        { label: 'System Health', href: '/protected/admin/system', icon: FaServer },
        { label: 'Database', href: '/protected/admin/system/database', icon: FaDatabase },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-400">
            Welcome, {(user as AdminUser)?.name || 'Admin User'}
          </p>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} className="py-2">
              {item.section ? (
                <>
                  <div className="text-gray-400 text-sm px-4 mb-1">{item.section}</div>
                  {item.items.map((subItem, subIndex) => {
                    const Icon = subItem.icon;
                    return Icon ? (
                      <Link
                        key={subIndex}
                        href={subItem.href || '#'}
                        className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                      >
                        {Icon && <Icon size={20} />}
                        <span className="font-medium">{subItem.label}</span>
                      </Link>
                    ) : null;
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

      <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
    </div>
  );
}
