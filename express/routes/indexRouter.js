const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('/', (req, res) => res.send('Reached index router'));

module.exports = indexRouter;