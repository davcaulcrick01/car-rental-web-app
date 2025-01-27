'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Form, Input, Switch, message } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // TODO: Implement API call to update user settings
      message.success('Settings updated successfully');
    } catch (error) {
      message.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const onPasswordChange = async (values: any) => {
    try {
      setLoading(true);
      // TODO: Implement API call to change password
      message.success('Password changed successfully');
    } catch (error) {
      message.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <Card title="Profile Details" className="mb-6">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
          </Form.Item>
          
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>
          
          <Form.Item label="Phone Number" name="phone">
            <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Profile
          </Button>
        </Form>
      </Card>

      <Card title="Security Settings" className="mb-6">
        <Form layout="vertical" onFinish={onPasswordChange}>
          <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Enter current password" />
          </Form.Item>
          
          <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Enter new password" />
          </Form.Item>
          
          <Form.Item 
            label="Confirm Password" 
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true },
              ({ getFieldValue }: { getFieldValue: (field: string) => string }) => ({
                validator(_: unknown, value: string) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match');
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm new password" />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" loading={loading}>
            Change Password
          </Button>
        </Form>
      </Card>

      <Card title="Two-Factor Authentication">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Enable Two-Factor Authentication</h3>
            <p className="text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onChange={(checked: boolean) => {
              setTwoFactorEnabled(checked);
              // TODO: Implement API call to toggle 2FA
              message.success(`Two-factor authentication ${checked ? 'enabled' : 'disabled'}`);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
