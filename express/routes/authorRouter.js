const { Router } = require('express');
const { getAuthorById, getAllAuthors } = require('../controllers/authorController');

const authorRouter = Router();

authorRouter.get('/', getAllAuthors);
authorRouter.get('/:authorId', getAuthorById);

module.exports = authorRouter;