import { JWT } from 'next-auth/jwt';
import { DefaultSession } from 'next-auth';
import type { User } from './types';

// https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth' {
  interface Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
  }
}
