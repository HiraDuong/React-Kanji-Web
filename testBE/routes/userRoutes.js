const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');


// Route cho user
router.get('/users', UserController.getAllUsers);
router.get('/users/user-id/:userId', UserController.getUserById);
router.get('/users/user-name/:username', UserController.getUserByUsername);
router.post('/users', UserController.createUser);
router.put('/users/:userId', UserController.updateUserById);
router.delete('/users/:userId', UserController.deleteUserById);

module.exports = router;
