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

      // Xáo trộn lại mảng để đảm bảo nghĩa đúng không ở vị trí cuối cùng
      randomMeanings.sort(() => Math.random() - 0.5);

      const quizzObject = {
        quizz: word.kanji,
        answer: randomMeanings,
        correctAnswer : word.meaning
      };

      quizzArray.push(quizzObject);
    });

    // Gửi kết quả về
    res.status(200).json( {courseName:course[0].course_name , Quizz :quizzArray} );
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getWordsByCourseId,
  createQuizz,
}