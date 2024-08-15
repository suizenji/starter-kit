import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// NOTE: Serverからのfetchをmockする場合 https://github.com/mswjs/msw/issues/1644

export const server = setupServer(...handlers);
