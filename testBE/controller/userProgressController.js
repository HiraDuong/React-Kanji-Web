const UserProgress = require("../models/userProgressModel");
const Word = require("../models/wordModel");

// Lấy danh sách từ đã nhớ của người dùng theo user_id và course_id
const getRememberedWordsByUserAndCourse = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const rememberedProgressWords = await UserProgress.findAll({
      where: { user_id: userId, course_id: courseId, remember: 1 },
    });
    const wordIds = rememberedProgressWords.map((item) => item.word_id);

    const rememberWords = await Word.findAll({
      where: {
        word_id: wordIds,
      },
    });
    res.json(rememberWords);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy danh sách từ chưa nhớ của người dùng theo user_id và course_id
const getNotRememberedWordsByUserAndCourse = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const notRememberedWords = await UserProgress.findAll({
      where: { user_id: userId, course_id: courseId, remember: 0 },
    });

    const wordIds = notRememberedWords.map((item) => item.word_id);

    const notRememberWords = await Word.findAll({
      where: {
        word_id: wordIds,
      },
    });
    res.json(notRememberWords);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update remember cho word

const updateRemember = async (req, res) => {
  const { userId, courseId, wordId, type } = req.params;

  try {
    const userProgress = await UserProgress.findOne({
      where: {
        user_id: userId,
        word_id: wordId,
        course_id: courseId,
      },
    });

    if (!userProgress) {
      // If userProgress not found, create a new instance
      userProgress = await UserProgress.create({
        user_id: userId,
        word_id: wordId,
        course_id: courseId,
        remember: type === "remember" ? 1 : 0,
      });
    }

    // Assuming remember is a property of UserProgress model

    if (type === "remember") userProgress.remember = 1;
    else if (type === "not-remember") userProgress.remember = 0;
    await userProgress.save();

    res.json({ message: "Remember updated successfully" });
  } catch (error) {
    console.error("Error updating remember status", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getNotRememberedWordsByUserAndCourse,
  getRememberedWordsByUserAndCourse,
  updateRemember,
  // Thêm hàm mới ở đây
};
