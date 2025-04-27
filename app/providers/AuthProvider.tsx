'use server'
// app/providers/AuthProviderServer.tsx
import { cookies } from 'next/headers';
import { AuthProviderClient } from './AuthProviderClient';
// import { AuthProviderClient } from './AuthProviderClient';

export async function AuthProvider({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('Token')?.value || null;

  return (
    <AuthProviderClient token={token}>
      {children}
    </AuthProviderClient>
  );
}
