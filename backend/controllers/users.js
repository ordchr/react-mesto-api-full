const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then(({
      /* eslint no-shadow: ["error", { "hoist": "done" }] */
      name, about, avatar, email,
    }) => res.send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        new Error('Такой email уже зарегистрирован');
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user === null) {
        new Error('Нет пользователя с таким id');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        new Error('Ошибочный формат id');
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
  )
    .orFail(new Error('Not found'))
    .then((userData) => res.send(userData))
    .catch((err) => {
      if (err.message === 'Not found') {
        new Error('Нет пользователя с таким id');
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
  )
    .orFail(new Error('Not found'))
    .then((userData) => res.send(userData))
    .catch((err) => {
      if (err.message === 'Not found') {
        new Error('Нет пользователя с таким id');
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const jwtToken = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      // res.cookie('jwt', token, {
      //   maxAge: 7 * 24 * 3600 * 1000, // jwt токен сроком на 1 неделю
      //   httpOnly: true,
      // });
      res.send({ token: jwtToken });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (user === null) {
        new Error('Нет пользователя с таким id');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        new Error('Ошибочный формат id');
      }
      next(err);
    });
};
