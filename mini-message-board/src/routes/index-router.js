const { Router } = require('express');
const indexController = require('../controllers/index-controller');

let messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
    id: 0,
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
    id: 1,
  },
];

const indexRouter = Router();
indexRouter.get('/', indexController.indexGet);

module.exports = { indexRouter, messages };
