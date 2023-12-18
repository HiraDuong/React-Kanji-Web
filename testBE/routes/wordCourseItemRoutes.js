// Trong wordCourseItemRoutes.js
const express = require('express');
const router = express.Router();
const wordCourseItemController = require('../controller/wordCourseItemController');

router.get('/courses/getword/:courseId', wordCourseItemController.getWordsByCourseId);
router.post('/create-courses/:course_id/add-words', wordCourseItemController.addWordsToCourse);

router.get('/quizzes/:courseId',wordCourseItemController.createQuizz)
module.exports = router;
