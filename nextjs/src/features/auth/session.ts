import { IS_SERVER } from '@/config/env';
import { Session } from 'next-auth';

// clientとserverを分けたり、serverで引数を渡したりするのが面倒なので統合。
// clientは通信が発生するため最適化している。
let sessionPromise: Promise<Session | null> | null = null;
export async function getSession() {
  if (IS_SERVER) {
    const { getServerSession } = await import('next-auth/next');
    const { authOptions } = await import('./options');

    return getServerSession(authOptions);
  }

  if (sessionPromise) {
    return sessionPromise;
  }

  sessionPromise = import('next-auth/react')
    .then(({ getSession: getClientSession }) => {
      return getClientSession();
    })
    .then((session) => {
      sessionPromise = null;
      return session;
    });

  return sessionPromise;
}
