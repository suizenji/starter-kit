import type { Express } from 'express';
import { invalidHandler } from '@/handlers/invalid';
import { userGetController } from './user-controller';
import { usersGetController } from './users-controller';
import { findGetController, findGetValidator } from './find-controller';

export function bind(app: Express) {
  app.get('/users', usersGetController);
  app.get('/users/:id', userGetController);
  app.get('/find-user', findGetValidator, invalidHandler, findGetController);
}
