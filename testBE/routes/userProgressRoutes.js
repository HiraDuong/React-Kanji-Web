const express = require('express');
const router = express.Router();

const UserProgressController = require('../controller/userProgressController');



router.get('/userProgress/Remember/uc/:userId/:courseId', UserProgressController.getRememberedWordsByUserAndCourse);
router.get('/userProgress/NotRemember/uc/:userId/:courseId', UserProgressController.getNotRememberedWordsByUserAndCourse);
router.put('/userProgress/Remember/uc/:userId/:courseId/:wordId/:type', UserProgressController.updateRemember);

module.exports = router;
