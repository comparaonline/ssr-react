import { Router } from 'express';
import { ClientStats } from 'Types/clientStats';
import { Request, Response } from 'Types/express';

import render from './render';

export default ({ clientStats }: { clientStats: ClientStats }): Router => {
  const router = Router();

  router.get('/route/a', (req: Request, res: Response): void => {
    res.send({ message: 'route A' });
  });

  router.get('/route/b', (req: Request, res: Response): void => {
    res.send({ message: 'route B' });
  });

  router.get('/route/c', async (req: Request, res: Response): Promise<void> => {
    const html = await render({ clientStats, req, res });
    res.send(html);
  });

  router.get('/route/d', async (req: Request, res: Response): Promise<void> => {
    const html = await render({ clientStats, req, res });
    res.send(html);
  });

  router.get('/route/apollo/a', async (req: Request, res: Response): Promise<void> => {
    const html = await render({ clientStats, req, res });
    res.send(html);
  });

  router.get('/route/apollo/b', async (req: Request, res: Response): Promise<void> => {
    const html = await render({ clientStats, req, res });
    res.send(html);
  });

  return router;
};
