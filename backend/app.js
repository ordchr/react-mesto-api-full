const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/users');

const { PORT = 9001 } = process.env;

const { COOKIE_SECRET } = process.env;
const { NotFoundError } = require('./modules/exceptions');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const whitelist = [
  'http://172.16.33.33:9000',
  'https://ordchr.students.nomoreparties.co',
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };// reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false };// disable CORS for this request
  }
  callback(null, corsOptions);// callback expects two parameters: error and options
};

const app = express();

app.use(cors(corsOptionsDelegate));

app.options('*', cors());

app.use(bodyParser.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/api/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);

app.use(auth);
app.use(cookieParser(COOKIE_SECRET));
app.use('/api/users', users);
app.use('/api/cards', cards);
app.use((req, res, next) => {
  next(new NotFoundError('404 Not found'));
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  /* eslint no-console: [ "error", {allow: ["log"] } ] */
  console.log(`App listening on port ${PORT}`);
});
