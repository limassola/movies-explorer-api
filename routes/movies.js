const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSavedMovies, deleteMovieById, createMovie,
} = require('../controllers/movies');

// eslint-disable-next-line no-useless-escape
const LINK_REGEXP = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9._~\-:?#[\]@!$&'()*+,\/;=]{2,256}\.[a-zA-Z0-9.\/?#-]{2,}$/;

router.get('/', getSavedMovies);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(LINK_REGEXP).required(),
    trailerLink: Joi.string().regex(LINK_REGEXP).required(),
    thumbnail: Joi.string().regex(LINK_REGEXP).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

module.exports = router;
