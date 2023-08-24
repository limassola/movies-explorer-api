const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUserProfile, getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserProfile);

module.exports = router;
