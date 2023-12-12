const Word = require("../models/wordModel");
const WordCourseItem = require("../models/courseWordItemModel");

exports.getWordsByCourseId = async (req, res) => {
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
