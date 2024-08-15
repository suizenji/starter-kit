import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db';

const userHandler = http.get(
  `https://www.google.com`,
  async ({ request, params, cookies }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('customerCode') ?? '1';

    const user = db.user.findFirst({
      where: { id: { equals: id } },
    });

    return HttpResponse.json(user);
  },
);

export const userHandlers = [userHandler];
