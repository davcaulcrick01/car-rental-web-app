'use client'

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupForm() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '', 
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError('');

    try {
      // First create user in database
      const dbRes = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          address: formData.address
        })
      });

      const dbData = await dbRes.json();

      if (!dbRes.ok) {
        throw new Error(dbData.error || 'Failed to create user in database');
      }

      // Then handle auth signup
      const authRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: formData.email.toLowerCase().trim()
        }),
        credentials: 'include',
      });

      const authData = await authRes.json();

      if (authRes.ok && authData.success) {
        const loginSuccess = await login(formData.email.toLowerCase().trim(), formData.password);
        if (loginSuccess) {
          router.push('/auth/signup/success');
        } else {
          router.push('/auth/login');
        }
      } else {
        setServerError(authData.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setServerError('Failed to create account. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Only clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
            {errors.password && <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number (Optional)"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full"
              aria-label="Phone number"
            />
          </div>

          <div>
            <Input
              type="text"
              name="address"
              placeholder="Address (Optional)"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full"
              aria-label="Address"
            />
          </div>

          {serverError && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3" role="alert">
              <p className="text-red-500 text-sm">{serverError}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            onClick={() => console.log('Google Sign-In Placeholder')}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center"
            aria-label="Continue with Google"
          >
            <Image src="/google.svg" alt="" width={20} height={20} className="mr-2" />
            Continue with Google
          </Button>

          <Button
            type="button"
            onClick={() => console.log('Apple Sign-In Placeholder')}
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 border border-gray-700 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center"
            aria-label="Continue with Apple"
          >
            <Image src="/apple.svg" alt="" width={20} height={20} className="mr-2" />
            Continue with Apple
          </Button>
        </div>
      </div>
    </div>
  );
}
