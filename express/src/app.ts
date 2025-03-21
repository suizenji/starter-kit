import express from 'express';
import cookieParser from 'cookie-parser';
import { route } from '@/routes';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

route(app);
