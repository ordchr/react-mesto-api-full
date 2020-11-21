const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const { findUserInJson } = require('../users');
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
}), getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().uri(),
  }),
}), updateAvatar);

module.exports = router;
