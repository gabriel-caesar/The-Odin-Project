const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.get('/', usersController.usersListGet);
usersRouter.get('/create', usersController.usersCreateGet);
usersRouter.post('/create', usersController.usersCreatePost);
usersRouter.get('/update/:id', usersController.usersUpdateGet);
usersRouter.post('/update/:id', usersController.usersUpdatePost);
usersRouter.post('/delete/:id', usersController.usersDeletePost);
usersRouter.post('/delete', usersController.usersDeleteAllPost);
usersRouter.get('/search', usersController.usersSearchGet);

module.exports = usersRouter;