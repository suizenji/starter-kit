import type { Session } from 'next-auth';
import { sign } from 'jsonwebtoken';
import { getToken } from '@/features/auth/getToken';

const session = {} as Session;
let getSessionCallCount = 0;

jest.mock('@/features/auth/session', () => {
  return {
    async getSession() {
      getSessionCallCount++;
      return session;
    },
  };
});

test('getTokenでinit cache, refresh, hit', async () => {
  getSessionCallCount = 0;
  let token = '';

  // 初回はcache miss、受け取った値を素直に設定
  const staleToken = sign({ exp: 1711524543 }, 'secret');
  session.accessToken = staleToken;
  token = await getToken();
  expect(token).toBe(staleToken);
  expect(getSessionCallCount).toBe(1);

  // 2回目はhitするが、期限切れなので更新
  // 多重で呼ばれても同一の結果を返すし、余計なリクエストもしない
  const freshToken = sign({ exp: 9711524543 }, 'secret');
  session.accessToken = freshToken;
  await Promise.all([getToken(), getToken(), getToken()]).then((values) => {
    expect(values[0]).toBe(freshToken);
    expect(values[1]).toBe(freshToken);
    expect(values[2]).toBe(freshToken);
  });
  expect(getSessionCallCount).toBe(2);

  // 3回目もhit、期限内なので余計なコールはしない
  session.accessToken = 'dummy';
  token = await getToken();
  expect(token).toBe(freshToken);
  expect(getSessionCallCount).toBe(2);
});
