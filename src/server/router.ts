import { Router } from 'express';
import { ClientStats } from 'Types/clientStats';
import { Request, Response } from 'Types/express';

import render from './render';

export default ({ clientStats }: { clientStats: ClientStats }): Router => {
  const router = Router();

  router.get('/home', async (req: Request, res: Response): Promise<void> => {
    const html: string = await render({ clientStats, req, res });
    res.send(html);
  });

  router.get('/route/a', async (req: Request, res: Response): Promise<void> => {
    const html = await render({ clientStats, req, res });
    res.send(html);
  });

  router.get('/route/b', async (req: Request, res: Response): Promise<void> => {
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
