// TODO: 上位階層に設置する
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'IT', testMatch: /.*\.spec\.ts/ },
  ],
  testDir: './__e2e__',
  fullyParallel: true,
  // retries: 1,
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    viewport: { width: 1280, height: 720 },
  },
};

export default config;
