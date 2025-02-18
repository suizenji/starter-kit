import express from 'express';
import cookieParser from 'cookie-parser';
import { bind } from '@/routes';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

bind(app);
