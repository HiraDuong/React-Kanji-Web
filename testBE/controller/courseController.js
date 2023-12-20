const Course = require('../models/courseModel');
const Sequelize = require('sequelize');
const WordCourseItem = require('../models/courseWordItemModel');
const Op = Sequelize.Op;

// Đảm bảo rằng file courseModel xuất ra đối tượng sequelize


// Create a new course
const createCourse = async (req, res) => {
  try {
    const { course_name, description, course_image, create_by ,created_by_user_id} = req.body;

    // Kiểm tra nếu course_image hoặc description là chuỗi rỗng
    const courseData = {};
    if (course_image !== '') {
      courseData.course_image = course_image;
    }
    if (description !== '') {
      courseData.description = description;
    }
    if(course_name ==='') res.status(400).json({error :'Tên khóa học không được để trống'})
    else
   { const newCourse = await Course.create({
      course_name,
      create_by,
      created_by_user_id,
      ...courseData,
    });

    // Lấy course_id từ newCourse
    const courseId = newCourse.getDataValue('course_id');

    res.status(201).json({ course_id: courseId });}
  } catch (error) {
    console.error('\n--------\n Error creating course:', error.name);
    res.status(500).json({ error: error.name });
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

// Search Course By name
// Trong hàm searchCoursesByName
const searchCoursesByName = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    const courses = await Course.findAll({
      where: {
        [Op.or]: [
          {
            course_name: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ],
      },
    });


    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: 'No courses found' });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get Courses created by
const getCoursesCreatedBy = async(req, res)=>{

  try {
    const userId = req.params.userId;
    const courses = await Course.findAll(
      {
        where: {
          created_by_user_id: userId,
        },
      }
    );



    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

// Delete Course by courseId
const deleteCourseById = async (req,res) =>{
  try{
    const courseId = req.params.id
     // Delete the course
     await Course.destroy({
      where: {
        course_id: courseId,
      },
    });

    res.status(204).send();


  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



//  Update course by courseId
const updateCourseById =async(req,res)=> { 
  try {
    const courseId = req.params.id;
    const { course_name, description, course_image,words } = req.body;

    // Check if the course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update the course infor
    const courseData = {};
    if (course_image !== '') {
      courseData.course_image = course_image;
    }
    if (description !== '') {
      courseData.description = description;
    }
    if(course_name != ''){
      courseData.course_name = course_name
    }
    await Course.update(
      {
        ...courseData,
      },
      {
        where: {
          course_id: courseId,
        },
      }
    );
    
      // update word in course
      // step 1 delete all word in course
      // step 2, add word in course
      await WordCourseItem.destroy(
        {
          where:{
            course_id:courseId
          }
        }
      )
        // Step 2: Add words to the course
const wordPromises = words.array.map(async (word) => {
  await WordCourseItem.create({
    courseId: courseId,
    wordId: word,
  });
});

// Wait for all wordPromises to complete
await Promise.all(wordPromises);

  

    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  

  
}


module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  searchCoursesByName,
  getCoursesCreatedBy,
  deleteCourseById,
  updateCourseById,
};
// Còn thiếu updateCourse và delete course

