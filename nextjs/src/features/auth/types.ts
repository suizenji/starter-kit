import type { User as DefaultUser } from 'next-auth';

export interface User extends DefaultUser {
  role?: 'admin' | 'guest';
}
