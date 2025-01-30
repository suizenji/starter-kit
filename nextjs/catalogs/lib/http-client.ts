import { API_URL } from '@/config/env';
import { getToken } from '@/features/auth';

interface Create {
  method?: string;
  urlBase?: string;
  token?: string;
  revalidate?: number;
}

export function create({
  method = 'GET',
  urlBase = API_URL,
  token,
  revalidate = 1,
}: Create): (path: string, init?: RequestInit) => Promise<Response> {
  return async function _fetch(path: string, init?: RequestInit) {
    const url = urlBase + path;

    init = init || {};
    init.method = init.method ?? method;

    const headers: { [key: string]: any } = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    init.headers = { ...headers, ...init.headers };

    init.next = init.next ? { ...init.next, revalidate }: { revalidate };

    return fetch(url, init);
  };
}

export function checkStatus(response: Response) {
  if (!response.ok) {
    throw new Error(`[http-client][checkStatus] status error: ${response.status}`);
  }
}

export async function get(path: string, init?: RequestInit) {
  const _fetch = create({ method: 'GET', token: await getToken() });
  const response = await _fetch(path, init);

  checkStatus(response);

  return response.json();
}
