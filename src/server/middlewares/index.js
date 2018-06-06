import locals from './locals';
import i18nextMiddleware from './i18next';

const applyMiddlewares = async (app) => {
  try {
    const middlewares = [
      await i18nextMiddleware,
      locals,
    ];

    middlewares.forEach((middleware) => {
      app.use(middleware);
    });
  } catch (error) {
    console.log(err);
  }
};

export default applyMiddlewares;
