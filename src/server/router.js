import { Router } from 'express';

import Render from './render';

export default ({ clientStats }) => {
  const router = new Router();

  router.get('/route/a', (req, res) => {
    res.send({ message: 'route A' });
  });

  router.get('/route/b', (req, res) => {
    res.send({ message: 'route B' });
  });

  router.get('/route/c', async (req, res) => {
    const html = await Render(clientStats, req, res);
    res.send(html);
  });

  router.get('/route/d', async (req, res) => {
    const html = await Render(clientStats, req, res);
    res.send(html);
  });

  router.get('/route/apollo/a', async (req, res) => {
    const html = await Render(clientStats, req, res);
    res.send(html);
  });

  router.get('/route/apollo/b', async (req, res) => {
    const html = await Render(clientStats, req, res);
    res.send(html);
  });

  return router;
};
