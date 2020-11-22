const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.getCard = (req, res) => {
  res.send(req.card);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.card._id, owner: req.user._id })
    .then((card) => {
      if (!card) {
        next(new Error('Not owner for card'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.card._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((likes) => res.send(likes));
};

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.card._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((likes) => res.send(likes));
