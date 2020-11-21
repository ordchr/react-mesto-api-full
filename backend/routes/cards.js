const router = require('express').Router();
const {
  createCard, getCards, getCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');
const { populateCard } = require('../modules/utils');

router.param('cardId', populateCard);
router.get('/', getCards);
router.post('/', createCard);
router.get('/:cardId', getCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
