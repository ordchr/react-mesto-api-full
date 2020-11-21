const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard, getCards, getCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');
const { populateCard } = require('../modules/utils');

router.param('cardId', populateCard);
router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
}), createCard);
router.get('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.number().integer(),
  }),
}), getCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.number().integer(),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.number().integer(),
  }),
}), dislikeCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.number().integer(),
  }),
}), deleteCard);

module.exports = router;
