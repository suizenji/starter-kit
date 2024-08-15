// @see https://github.com/mswjs/msw/issues/1644#issuecomment-1750722052
// npm install -D @mswjs/http-middleware cors @types/cors
import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';
import cors from 'cors';
import { seed } from './db';

// 本機能はNext.jsから呼ばれないため、ここでURLを解決する。
import { loadEnvConfig } from '@next/env';
const projectDir = process.cwd();
const isDev = process.env.NODE_ENV !== 'production';
const { combinedEnv } = loadEnvConfig(projectDir, isDev);
const API_URL = combinedEnv.NEXT_PUBLIC_API_URL as string;
process.env.API_URL = API_URL;

const url = new URL(API_URL);
const port = url.port || 8080;

seed();

const app = express();
app.use(cors());
app.use(express.json());

const { handlers } = require('./handlers');
app.use(createMiddleware(...handlers));

app.listen(port, () =>
  console.log(`Mock server is running: ${url.hostname}:${port}`),
);
