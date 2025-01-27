'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { updateUserPreferences, getUserPreferences } from '@/lib/api/users';

export default function UserPreferences() {
  const { userId } = useParams();
  const [preferences, setPreferences] = useState({
    language: 'en',
    region: 'US',
    autoLogin: false,
    marketingEmails: true,
    darkMode: false
  });

  useEffect(() => {
    const loadPreferences = async () => {
      if (typeof userId === 'string') {
        const userPrefs = await getUserPreferences(userId);
        setPreferences(userPrefs);
      }
    };
    loadPreferences();
  }, [userId]);

  const handlePreferenceChange = async (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    if (typeof userId === 'string') {
      await updateUserPreferences(userId, { [key]: value });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Preferences</h1>
      
      <Card className="mb-6">
        <h2 className="text-xl mb-4">Regional Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Language</label>
            <Select
              value={preferences.language}
              onValueChange={(value) => handlePreferenceChange('language', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2">Region</label>
            <Select
              value={preferences.region}
              onValueChange={(value) => handlePreferenceChange('region', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="EU">Europe</SelectItem>
                <SelectItem value="AS">Asia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable Auto-login</span>
            <Switch
              checked={preferences.autoLogin}
              onCheckedChange={(checked) => handlePreferenceChange('autoLogin', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Receive Marketing Emails</span>
            <Switch
              checked={preferences.marketingEmails}
              onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <Switch
            checked={preferences.darkMode}
            onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
          />
        </div>
      </Card>
    </div>
  );
}
