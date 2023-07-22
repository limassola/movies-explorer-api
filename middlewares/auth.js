require('dotenv').config();
const jwt = require('jsonwebtoken');
const InvalidAuth = require('../errors/invalid-auth');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    const error = new InvalidAuth('Требуется авторизация');
    return next(error);
  }

  try {
    // eslint-disable-next-line dot-notation
    payload = jwt.verify(token, process.env['JWT_SECRET']);
  } catch (err) {
    const error = new InvalidAuth(err);
    return next(error);
  }

  req.user = payload;
  next();
};

module.exports = auth;
