import { Request, Response } from 'express';
import { users } from './data';
import { query } from 'express-validator';

export const findGetValidator = [
  query('id')
    .isInt({ min: 0, max: 2 })
    .withMessage('id must be an integer between 0 and 2'),
];

export async function findGetController(req: Request, res: Response) {
  console.log(`[${req.url}][GET] pid = ${process.pid}`);
  const { id } = req.query;

  res.json(users[Number(id)]);
}
