import { Request, Response } from 'express';
import { users } from './data';

export async function usersGetController(req: Request, res: Response) {
  console.log(`[${req.url}][GET] pid = ${process.pid}`);

  res.json(users);
}
