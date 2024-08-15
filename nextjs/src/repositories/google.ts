import type { Google } from '@/types';

export async function find(): Promise<Google> {
  const google: Google = {
    isEvil: false,
  };

  const res = await fetch('https://www.google.com');

  if (res.status !== 200) {
    google.isEvil = true;
  }

  return google;
}
