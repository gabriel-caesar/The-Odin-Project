const { body, validationResult, matchedData } = require('express-validator');
const queries = require('../db/queries');

const validateMessage = [
  body('authorName')
    .trim()
    .isLength({ min: 2, max: 20})
    .withMessage('Name needs to be between 2 and 20 characters')
    .isAlpha()
    .withMessage('Name accepts only letters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 250 })
    .withMessage('Message needs to be between 10 and 250 characters')
]

exports.createNewMessagePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('form', { title: 'Create new message', errors: errors.array() });
    }
    const { authorName, message } = matchedData(req);
    await queries.createNewMessage(authorName, message, new Date());
    res.redirect('/');
  }
];

exports.newMessageDetailsGet = async (req, res) => {
  const { messageId } = req.params;
  const messageQuery = await queries.getUser(messageId);
  const message = messageQuery[0];
  if (!message) throw new Error('Message ID not found');
  res.render('message', {
    message: message,
    title: `${message.username}'s message`,
  });
};

exports.newMessageDeletePost = async (req, res) => {
  const { messageId } = req.params;
  await queries.deleteUser(messageId);
  res.redirect('/');
};

exports.createNewMessageGet = (req, res) =>
  res.render('form', { title: 'Create new message' });