const express = require('express');
const router = express.Router();

const AuthController = require('../controller/authController');


// Route cho đăng nhập và kiểm tra đăng nhập
router.post('/auth/login', 
AuthController.login
);
router.get('/auth/check-auth', AuthController.checkAuth);
router.post('/auth/logout', AuthController.logout);
module.exports = router;
