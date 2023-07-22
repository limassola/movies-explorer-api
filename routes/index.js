const express = require('express');

const router = express.Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

const handleInvalidPath = (req, res, next) => {
  const error = new NotFoundError('Invalid Path');
  next(error);
};

router.use(auth);
router.use('/movies', userRoutes);
router.use('/movies', movieRoutes);
router.use(handleInvalidPath);

module.exports = router;
