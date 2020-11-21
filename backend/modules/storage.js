const fs = require('fs').promises;
const path = require('path');

const readJsonFile = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  return new Promise((resolve, reject) => fs.readFile(filePath, { encoding: 'utf8' })
    .then((data) => resolve(JSON.parse(data)))
    .catch((err) => {
      reject(err);
    }));
};

const getUsers = () => readJsonFile('../data/users.json');

const getCards = () => readJsonFile('../data/cards.json');

module.exports = {
  getUsers,
  getCards,
};
