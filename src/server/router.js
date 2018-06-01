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

  router.get('/route/c', (req, res) => {
    Render(clientStats, req, res);
  });

  router.get('/route/d', (req, res) => {
    Render(clientStats, req, res);
  });

  router.get('/route/apollo/a', (req, res) => {
    Render(clientStats, req, res);
  });

  router.get('/route/apollo/b', (req, res) => {
    Render(clientStats, req, res);
  });

  return router;
};
