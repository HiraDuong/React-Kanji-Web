const express = require("express");
const courseController = require("../controller/courseController");

const router = express.Router();

// Route to create a new course
router.post("/courses", courseController.createCourse);

// Route to get all courses
router.get("/courses", courseController.getAllCourses);
//  get by id
router.get("/courses/courseId/:id", courseController.getCourseById);

// search course by name

router.get("/courses/search", courseController.searchCoursesByName); // Sửa đường dẫn và dấu nháy đơn

//  get course created by userID
router.get("/courses/created-by/:userId", courseController.getCoursesCreatedBy);

// /delete course
router.delete("/courses/courseId/:id", courseController.deleteCourseById);
// update course
router.put("/courses/courseId/:id", courseController.updateCourseById);

module.exports = router;
