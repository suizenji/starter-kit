'use client';

import React, { ReactNode } from 'react';

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

/* TODO: Next-AuthやMSWを使う場合
import dynamic from 'next/dynamic';
import { MSWWrapperProps } from '@/lib/msw';
import { SessionProvider } from 'next-auth/react';

const MSWWrapper = dynamic<MSWWrapperProps>(() =>
  import('@/lib/msw').then(({ MSWWrapper, setup }) => {
    return setup().then(() => MSWWrapper);
  }),
);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MSWWrapper>
      <SessionProvider>
        {children}
      </SessionProvider>
    </MSWWrapper>
  );
}
*/
