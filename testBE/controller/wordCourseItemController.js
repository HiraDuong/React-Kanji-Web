const Word = require("../models/wordModel");
const WordCourseItem = require("../models/courseWordItemModel");
const CourseModel = require("../models/courseModel");

const getWordsByCourseId = async (req, res) => {
  const { courseId } = req.params;

  try {
    const wordCourseItems = await WordCourseItem.findAll({
      where: {
        course_id: courseId,
      },
    });

    // Lấy danh sách wordId từ kết quả
    const wordIds = wordCourseItems.map(item => item.wordId);

    // Sử dụng danh sách wordIds để lấy các từ từ bảng words
    const words = await Word.findAll({
      where: {
        word_id: wordIds,
      },
    });
  

    // Trả về đối tượng JSON bao gồm thông tin Course ID và danh sách từ
    res.json({ courseId, words });
  } catch (error) {
    console.error('Error fetching words by course ID', error);
    res.status(500).send('Internal Server Error');
  }
};

// Tạo quizz cho khóa học

const createQuizz = async (req, res) => {
  const { courseId } = req.params;
  const quizzArray = [];

  try {
    const wordCourseItems = await WordCourseItem.findAll({
      where: {
        course_id: courseId,
      },
    });

    // Lấy danh sách wordId từ kết quả
    const wordIds = wordCourseItems.map((item) => item.wordId);

    // Sử dụng danh sách wordIds để lấy các từ từ bảng words
    const words = await Word.findAll({
      where: {
        word_id: wordIds,
      },
    });

    const course = await CourseModel.findAll({
      where:{
        course_id : courseId,
      },
    })

    words.forEach((word) => {
      // Lấy ngẫu nhiên 3 từ meaning
      const randomMeanings = words
        .map((w) => w.meaning)
        .filter((meaning) => meaning !== word.meaning && meaning !== "" && meaning !== undefined && meaning !== null) // Lọc ra nghĩa khác với nghĩa đúng
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // Thêm nghĩa đúng vào mảng
      randomMeanings.push(word.meaning);

      // ///////////
          // Lấy ngẫu nhiên 3 từ meaning
          const randomKanji = words
          .map((w) => w.kanji)
          .filter((kanji) => kanji !== word.kanji && kanji !== "" && kanji !== undefined && kanji !== null) // Lọc ra nghĩa khác với nghĩa đúng
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
  
        // Thêm nghĩa đúng vào mảng
        randomKanji.push(word.kanji);


      // Xáo trộn lại mảng để đảm bảo nghĩa đúng không ở vị trí cuối cùng
      randomMeanings.sort(() => Math.random() - 0.5);
      randomKanji.sort(() => Math.random() - 0.5);

      const quizzObject = {
        quizz: word.kanji,
        answer: randomMeanings,
        correctAnswer : word.meaning
      };

      const quizzObject2={
        quizz: word.meaning,
        answer:randomKanji,
        correctAnswer:word.kanji
      }

      quizzArray.push(quizzObject);
      quizzArray.push(quizzObject2);

    });
    quizzArray.sort(() => Math.random() * 20 - 10);


    // Gửi kết quả về
    res.status(200).json( {courseName:course[0].course_name , Quizz :quizzArray} );
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// API để thêm các từ vào khóa học
const addWordsToCourse = async (req, res) => {
  try {
    const { course_id, word_ids } = req.body;

    // Kiểm tra xem course_id có tồn tại không
    // const existingCourse = await Course.findByPk(course_id);
    // if (!existingCourse) {
    //   return res.status(404).json({ error: 'Course not found' });
    // }

    // Lặp qua mảng word_ids và thêm từng từ vào bảng course_word_item
  
  
     for (const word_id of word_ids) {
       await WordCourseItem.create({
         courseId : course_id,
         wordId: word_id,
       });
     }
     
    console.log("Course",course_id)

    res.status(201).json({ message: 'Words added to the course successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getWordsByCourseId,
  createQuizz,
  addWordsToCourse
}