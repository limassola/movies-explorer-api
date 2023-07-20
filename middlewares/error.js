const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const DuplicateError = require('../errors/duplicate-error');
const InvalidAuth = require('../errors/invalid-auth');
const AbstractError = require('../errors/abstract-error');
const ForbiddenError = require('../errors/forbidden-error');

const errorHandler = (err, req, res, next) => {
  let error;
  if (err.code === 11000) {
    error = new DuplicateError(err);
  } else if (err instanceof NotFoundError || CastError || InvalidAuth || ForbiddenError) {
    error = err;
  } else {
    error = new AbstractError(err);
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
