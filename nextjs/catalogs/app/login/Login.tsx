'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import LoginView from './LoginView';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const id = data.get('id');
    const password = data.get('password');

    setIsLoading(true);

    signIn('idpw', {
      id,
      password,
      callbackUrl: '/',
    });
  };

  return (
    <LoginView
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isError={searchParams.has('error')}
    />
  );
}
