// Trong wordRoutes.js
const express = require('express');
const router = express.Router();
const wordController = require('../controller/wordController');
router.get('/words', wordController.getAllWords);
router.get('/words/:wordId', wordController.getWordById);

module.exports = router;
