/* eslint-disable @typescript-eslint/no-explicit-any */

import { getServerSession } from 'next-auth/next';
import { authOptions, type User as SessionUser } from '@/features/auth';
import type { User as DbUser } from '@/types';
import { getUser } from './queries/user';

export function withLoggedIn<T extends (...args: any[]) => any>(
  func: T,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const { dbUser } = await authorize();
    return call(() => func(...args), dbUser);
  };
}

type Shift<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;
type InjectionObject = {
  sessionUser: SessionUser;
  dbUser: DbUser;
};

export function withObject<
  T extends (obj: InjectionObject, ...args: any[]) => any,
>(func: T): (...args: Shift<Parameters<T>>) => Promise<Awaited<ReturnType<T>>> {
  return async (
    ...args: Shift<Parameters<T>>
  ): Promise<Awaited<ReturnType<T>>> => {
    const { sessionUser, dbUser } = await authorize();
    return call(() => func({ sessionUser, dbUser }, ...args), dbUser);
  };
}

export async function call<T extends (...args: any[]) => any>(
  func: T,
  user: DbUser,
) {
  try {
    return await func();
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const msg = `[${user.userId}] ${errMsg}`;

    throw new Error(msg, {
      cause: error,
    });
  }
}

export async function authorize() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('xxx');
  if (!session.user) throw new Error('xxx');

  const sessionUser = session.user;
  const dbUser = await getUser(Number(sessionUser.id)).catch((error) => {
    throw new Error('xxx', {
      cause: error,
    });
  });

  if (!dbUser) throw new Error('xxx');

  return { sessionUser, dbUser };
}
