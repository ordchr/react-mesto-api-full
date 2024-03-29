const Card = require('../models/card');

const populateCard = (req, res, next, cardId) => Card.findById(cardId)
  .then((card) => {
    if (card === null) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
    } else {
      req.card = card;
      next();
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибочный формат id' });
    }
    next(err);
  });

const joiValidateUrl = (value) => {
  if (!/https?:\/\/[.\w-]+\.\w+[\w-/]+#?/gm.test(value)) {
    throw new Error('Wrong URL');
  }

  return value;
};

module.exports = {
  populateCard,
  joiValidateUrl,
};
