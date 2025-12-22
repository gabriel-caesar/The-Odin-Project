const queries = require('../db/queries');

exports.indexGet = async (req, res) => {
  const messages = await queries.getAllMessages();
  if (!messages) throw new Error(`Couldn't fetch messages.`);
  res.render('index', { title: 'Mini Message Board', messages: messages })
}
