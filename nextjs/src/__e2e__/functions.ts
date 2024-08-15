import { test } from '@playwright/test';

const DIST = `${__dirname}/.auth`;

export function configAdmin() {
  test.use({
    storageState: `${DIST}/admin.json`,
  });
}

export function configGuest() {
  test.use({
    storageState: `${DIST}/guest.json`,
  });
}
