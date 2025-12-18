const { Router } = require('express');
let { messages } = require('./index-router');
const { v4 } = require('uuid');

const newRouter = Router();

newRouter.get('/', (req, res) =>
  res.render('form', { title: 'Create new message' })
);
newRouter.post('/', (req, res) => {
  const { authorName, message } = req.body;
  const newMessage = {
    text: message,
    user: authorName,
    added: new Date(),
    id: v4(),
  };
  messages.unshift(newMessage);
  res.redirect('/');
});

newRouter.get('/:messageId', (req, res) => {
  const { messageId } = req.params;
  const message = messages.find((m) => m.id === messageId);
  if (!message) throw new Error('Message ID not found');
  res.render('message', {
    message: message,
    title: `${message.user}'s message`,
  });
});

newRouter.post('/delete/:messageId', (req, res) => {
  const { messageId } = req.params;
  const index = messages.findIndex((m) => m.id === messageId);
  if (index === -1) throw new Error('Message ID not found');
  messages.splice(index, 1);
  res.redirect('/');
});

module.exports = newRouter;
