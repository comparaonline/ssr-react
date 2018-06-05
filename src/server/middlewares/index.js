import locals from './locals';

const middlewares = [
  locals,
];

const applyMiddlewares = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};

export default applyMiddlewares;
