import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

async function login(
  page: Page,
  username: string,
  password: string,
  outPath: string,
) {
  await page.goto('/');
  await page.waitForURL('/api/auth/signin*');

  await page.getByRole('textbox', { name: 'id' }).fill(username);
  await page.getByRole('textbox', { name: 'password' }).fill(username);
  await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
  await page.waitForURL('/');

  await page.context().storageState({ path: outPath });
}

const DIST = `${__dirname}/.auth`;

test.describe('create login sessions', () => {
  test('admin', async ({ page }) => {
    await login(page, 'admin', 'admin', `${DIST}/admin.json`);
  });

  test.skip('guest', async ({ page }) => {
    await login(page, 'guest', 'guest', `${DIST}/guest.json`);
  });
});
