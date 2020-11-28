const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { joiValidateUrl } = require('../modules/utils');

const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(joiValidateUrl, 'custom validate URL'),
  }),
}), updateAvatar);

module.exports = router;
