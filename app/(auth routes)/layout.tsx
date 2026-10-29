'use client'; 

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      {children}
    </>
  );
}
