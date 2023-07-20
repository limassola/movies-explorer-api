require('dotenv').config();
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const InvalidAuth = require('../errors/invalid-auth');

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Not found'))
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => res.status(201).send(user))
        .catch(next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  // if (!email || !password) {
  //   res.status(401).send({ message: 'Введите данные' });
  // }

  User.findOne({ email })
    .select('+password')
    .orFail(() => new InvalidAuth())
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user.id,
            // eslint-disable-next-line dot-notation
            }, process.env['JWT_SECRET']);
            res.cookie('jwt', jwt, {
              maxAge: 36000,
              httpOnly: true,
              sameSite: true,
            });
            res.send(user.toJSON());
          } else {
            next();
          }
        });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserProfile,
  createUser,
  login,
};
