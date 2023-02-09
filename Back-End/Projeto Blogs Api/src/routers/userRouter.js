const express = require('express');
const userController = require('../controllers/user.controller');
const validateReqNewUser = require('../middlewares/validateReqNewUser');
const validateJWT = require('../middlewares/validateJWT');

const userRouter = express.Router();

userRouter.post('/', validateReqNewUser, userController.postUser);
userRouter.get('/', validateJWT, userController.getUsers);
userRouter.get('/:id', validateJWT, userController.getUserById);
userRouter.delete('/me', validateJWT, userController.deleteUser);

module.exports = userRouter;
