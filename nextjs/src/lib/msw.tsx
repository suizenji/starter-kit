import { ReactNode } from 'react';

import { IS_BROWSER, API_MOCKING } from '@/config/env';
import { seed } from '@/mocks/db';

export type MSWWrapperProps = {
  children: ReactNode;
};

export const MSWWrapper = ({ children }: MSWWrapperProps) => {
  return <>{children}</>;
};

export async function setup() {
  if (IS_BROWSER && API_MOCKING) {
    const { worker } = require('@/mocks/browser');
    await worker.start();
    seed();
  }
}
