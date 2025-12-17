const db = require('../db');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

async function getBookById(req, res) {
  const { bookId } = req.params;
  const book = await db.getBookById(bookId);
  if (!book) throw new CustomNotFoundError('Book not found');
  res.send(`Book name: ${book.name}`);
}

async function getAllBooks(req, res) {
  const books = await db.getAllBooks();
  if (!books) res.next(new Error('Wrong Address'), error);
  res.send(books);
}

module.exports = { getBookById, getAllBooks };  