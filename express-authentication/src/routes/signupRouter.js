const { Router } = require('express');
const { signUpGet, signUpPost } = require('../controllers/signupController');

const signupRouter = Router();

signupRouter.get('/', signUpGet);
signupRouter.post('/', signUpPost);

module.exports = signupRouter;