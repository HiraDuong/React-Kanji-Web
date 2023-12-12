// Trong wordCourseItemRoutes.js
const express = require('express');
const router = express.Router();
const wordCourseItemController = require('../controller/wordCourseItemController');

router.get('/courses/getword/:courseId', wordCourseItemController.getWordsByCourseId);

module.exports = router;
