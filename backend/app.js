const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

const { PORT = 9001 } = process.env;

const { COOKIE_SECRET } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(cookieParser(COOKIE_SECRET));
app.use('/users', users);
app.use('/cards', cards);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use((err, req, res, next) => {
  if (err.message.includes('validation failed')) {
    res.status(400);
  } else {
    res.status(500);
  }
  res.send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  /* eslint no-console: [ "error", {allow: ["log"] } ] */
  console.log(`App listening on port ${PORT}`);
});
