// usage. export const metadata = createMeta({ title });
import { Metadata } from 'next';

const APP_NAME = 'app-name';

interface IMeta {
  title: string;
}

export function createMeta({ title }: IMeta): Metadata {
  const _title = title ? `${title} | ${APP_NAME}` : APP_NAME;

  return {
    title: _title,
    robots: {
      index: false,
      follow: false,
    },
  };
}
