// sample db with fake data
const authors = [
  { id: 1, name: 'Bryan' },
  { id: 2, name: 'Christian' },
  { id: 3, name: 'Jason' },
];

const books = [
  { id: 1, name: 'Travel to the Router World', authorId: 2 },
  { id: 2, name: 'Middleware Journey', authorId: 1 },
  { id: 3, name: 'The Custom Error Universe', authorId: 3 },
];

async function getBookById(bookId) {
  return books.find((b) => b.id == bookId);
}

async function getAllBooks() {
  return books;
}

async function getAuthorById(authorId) {
  return authors.find((a) => a.id == authorId);
}

async function getAllAuthors() {
  return authors;
}

// exporting the getter function
module.exports = { getAuthorById, getAllAuthors, getBookById, getAllBooks };
