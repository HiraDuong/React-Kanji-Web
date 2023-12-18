// Trong wordRoutes.js
const express = require('express');
const router = express.Router();
const wordController = require('../controller/wordController');
router.get('/words', wordController.getAllWords);
router.get('/words/:wordId', wordController.getWordById);
router.get('/search/words',wordController.searchWordsbyName);
router.post('/words', wordController.createWord);


module.exports = router;
