import { http, HttpResponse } from 'msw';
import { userHandlers } from './user';

//import { API_URL } from '@/config';
const API_URL = 'http://localhost:3000';

export const handlers = [
  http.get(`${API_URL}/health-check`, () => {
    return HttpResponse.json({ status: 'ok' });
  }),
  http.post(`https://www.google.com`, async ({ request }) => {
    const json = await request.json();
    return HttpResponse.json(json);
  }),
  ...userHandlers,
];
