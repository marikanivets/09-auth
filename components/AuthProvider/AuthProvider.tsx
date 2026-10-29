'use client';

import React, { useEffect, useState } from 'react';
import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const sessionData = await checkSession();
        
        setUser(sessionData.user);
      } catch (error) {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>Loading session...</div>;
  }

  return <>{children}</>;
}
