const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

// Контроллер для получения всех сохраненных фильмов текущим пользователем
const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// Контроллер для создания фильма
const createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

// Контроллер для удаления сохраненного фильма по id
const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError('Фильм с указанным id не найден.'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав для удаления фильма.');
      }
      return Movie.findByIdAndDelete(req.params.cardId);
    })
    .then(() => {
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch(next);
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovieById,
};
