const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.user);

router.post('/login', userController.user);

router.post('/create', userController.createUser);

router.post('/createPanelAdmin', userController.createUserPanelAdmin);

router.get('/sellers', userController.getSellers);

router.get('/userid', userController.getUserId);

module.exports = router;
