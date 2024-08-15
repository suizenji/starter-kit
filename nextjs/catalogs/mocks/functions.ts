import { API_URL } from '@/config/env';

// Next.jsから実行されない場合にも設定を読み込むための機能。
export function getApiUrl(): string {
  return process.env.API_URL || (API_URL as string);
}
