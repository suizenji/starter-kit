//import { setupWorker } from 'msw/browser';
import { setupWorker } from '@/node_modules/msw/lib/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
