// https://nextjs.org/blog/security-nextjs-server-components-actions
'use server';

import { googleRepository } from '@/repositories';
import { getSession } from '@/features/auth';

export async function canFind() {
  const user = (await getSession())?.user;
  if (!user) return false;

  const isAdmin = user.role === 'admin';
  if (!isAdmin) return false;

  return true;
}

export async function find() {
  if (!(await canFind())) return null;

  return googleRepository.find();
}
