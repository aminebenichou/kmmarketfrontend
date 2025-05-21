'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { signup } from '@/app/requests';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ✅ Response type from signup API
export type SignupResponse = {
  message?: string;
  [key: string]: unknown; // optional: for any extra fields
};

// ✅ Form fields type
type FormData = {
  username: string;
  email: string;
  password: string;
};

const SellerSignUpPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  // ✅ Typed input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Typed submit handler with async/await
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const resp: SignupResponse = await signup<FormData, SignupResponse>('seller/', formData);
      if (resp.message) {
        router.push('/seller/subscriptions');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Seller Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Full Name</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <center className="my-5">
            <Link href="/login">
              Already have an account <strong>Login Here</strong>
            </Link>
          </center>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerSignUpPage;
