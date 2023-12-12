const express = require('express');
const courseController = require('../controller/courseController');

const router = express.Router();

// Route to create a new course
router.post('/courses', courseController.createCourse);

// Route to get all courses
router.get('/courses', courseController.getAllCourses);
//  get by id
router.get('/courses/courseId/:id', courseController.getCourseById);

module.exports = router;
