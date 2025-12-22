const { Router } = require('express');
const newController = require('../controllers/new-controller');

const newRouter = Router();
newRouter.get('/', newController.createNewMessageGet);
newRouter.post('/', newController.createNewMessagePost);
newRouter.get('/:messageId', newController.newMessageDetailsGet);
newRouter.post('/delete/:messageId', newController.newMessageDeletePost);

module.exports = newRouter;