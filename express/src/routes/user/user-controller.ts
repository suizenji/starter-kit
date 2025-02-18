import { Request, Response } from 'express';
import { users } from './data';

export async function userGetController(req: Request, res: Response) {
  console.log(`[${req.url}][GET] pid = ${process.pid}`);

  const id = Number(req.params.id);
  res.json(users[id]);
}
