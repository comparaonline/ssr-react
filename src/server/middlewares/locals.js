export default (req, res, next) => {
  const locals = req.locals || {};

  Object.assign(locals, {
    middlewareApplied: true,
  });

  req.locals = locals;
  next();
};
