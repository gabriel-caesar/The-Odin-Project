const { Router } = require('express');
const { v4 } = require('uuid');

let messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
    id: v4(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
    id: v4(),
  },
];

const indexRouter = Router();

indexRouter.get('/', (req, res) =>
  res.render('index', { title: 'Mini Message Board', messages: messages })
);

module.exports = { indexRouter, messages };
