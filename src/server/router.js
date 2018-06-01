import { Router } from 'express';

export default ({ clientStats }) => {
  const router = new Router();

  router.get('/route/a', (req, res) => {
    res.send({ message: 'route A' });
  });

  router.get('/route/b', (req, res) => {
    res.send({ message: 'route B' });
  });

  return router;
};
