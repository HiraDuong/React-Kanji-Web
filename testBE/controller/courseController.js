const Course = require('../models/courseModel');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { course_name, description, course_image } = req.body;
    const newCourse = await Course.create({
      course_name,
      description,
      course_image,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a course by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findAll(
      {
        where: {
          course_id: courseId,
        },
      }
    );

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById
};