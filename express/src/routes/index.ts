import type { Express, Request, Response } from 'express';
import { bind as bindUser } from './user/route';

export function bind(app: Express) {
  bindUser(app);

  app.get('/', (req: Request, res: Response) => {
    console.log(`[/][GET] pid = ${process.pid}`);
    res.send('Hello World!');
  });

  app.post('/', (req: Request, res: Response) => {
    console.log(`[/][POST] pid = ${process.pid}`);
    console.log(`body = ${JSON.stringify(req.body)}`);
    console.log(`cookie = ${JSON.stringify(req.cookies)}`);
    res.send('Hello World!');
  });

  app.get('/throw', (req: Request, res: Response) => {
    console.log(`[/throw] pid = ${process.pid}`);
    throw new Error('throw!!');
  });
}
