'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Card,
  List,
  ListItem,
  Switch,
  Typography,
  IconButton
} from '@mui/material';
import {
  NotificationsActive,
  NotificationsOff,
  CheckCircle,
  RadioButtonUnchecked
} from '@mui/icons-material';

interface Notification {
  id: string;
  message: string;
  type: 'reminder' | 'payment' | 'system';
  isRead: boolean;
  createdAt: Date;
}

interface NotificationSettings {
  reminders: boolean;
  payments: boolean;
  system: boolean;
}

export default function NotificationsPage() {
  const { userId } = useParams();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    reminders: true,
    payments: true,
    system: true
  });

  useEffect(() => {
    // TODO: Fetch notifications from API
    // This is mock data for demonstration
    setNotifications([
      {
        id: '1',
        message: 'Your rental period ends in 2 days',
        type: 'reminder',
        isRead: false,
        createdAt: new Date()
      },
      {
        id: '2',
        message: 'Payment successful for booking #123',
        type: 'payment',
        isRead: true,
        createdAt: new Date()
      }
    ]);
  }, [userId]);

  const handleMarkAsRead = async (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ));
    // TODO: Update notification status in API
  };

  const handleToggleNotificationType = (type: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    // TODO: Update notification preferences in API
  };

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-6">
        Notifications
      </Typography>

      <Card className="mb-6 p-4">
        <Typography variant="h6" className="mb-4">
          Notification Settings
        </Typography>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography>Rental Reminders</Typography>
            <Switch
              checked={settings.reminders}
              onChange={() => handleToggleNotificationType('reminders')}
            />
          </div>
          <div className="flex justify-between items-center">
            <Typography>Payment Alerts</Typography>
            <Switch
              checked={settings.payments}
              onChange={() => handleToggleNotificationType('payments')}
            />
          </div>
          <div className="flex justify-between items-center">
            <Typography>System Notifications</Typography>
            <Switch
              checked={settings.system}
              onChange={() => handleToggleNotificationType('system')}
            />
          </div>
        </div>
      </Card>

      <Card>
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              className={`flex justify-between items-center ${
                notification.isRead ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div>
                <Typography variant="body1">
                  {notification.message}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {notification.createdAt.toLocaleDateString()}
                </Typography>
              </div>
              <IconButton
                onClick={() => handleMarkAsRead(notification.id)}
                color={notification.isRead ? 'default' : 'primary'}
              >
                {notification.isRead ? <CheckCircle /> : <RadioButtonUnchecked />}
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
