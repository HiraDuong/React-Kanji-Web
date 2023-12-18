const Word = require("../models/wordModel");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAllWords = async (req, res) => {
  try {
    const words = await Word.findAll();
    res.json(words);
  } catch (error) {
    console.error('Error fetching words', error);
    res.status(500).send('Internal Server Error');
  }
};

const getWordById = async (req, res) => {
    const { wordId } = req.params;
    try {
      const word = await Word.findAll(
    {    where: {
            word_id: wordId,
          },}
      );
  
      if (!word) {
        return res.status(404).json({ error: 'Word not found' });
      }
  
      res.json(word);
    } catch (error) {
      console.error('Error fetching word by ID', error);
      res.status(500).send('Internal Server Error');
    }
   
  };
  

  // search words by name
  const searchWordsbyName = async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm;
      console.log('Search Term:', searchTerm);
      const words = await Word.findAll({
        where: {
          [Op.or]: [
            { kanji: { [Op.iLike]: `%${searchTerm}%` } },
            { meaning: { [Op.iLike]: `%${searchTerm}%` } },
            { pronounce: { [Op.iLike]: `%${searchTerm}%` } },

          ],
        },
      });
  
      if (!words || words.length === 0) {
        return res.status(404).json({ error: 'No words found' });
      }
  
      res.status(200).json(words);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // create Word : Only Admin can do

  const createWord = async (req, res) => {
    try {
      // Chỉ cho phép admin thêm từ mới (bạn có thể xác định điều này dựa trên logic ủy quyền)
      // Ví dụ: if (!req.user || req.user.role !== 'admin') {
      //   return res.status(403).json({ error: 'Permission denied' });
      // }
  
      const { kanji, meaning, pronounce, image } = req.body;
  
      // Xác định các trường cần thêm vào cơ sở dữ liệu
      const fieldsToInsert = {
        kanji,
        meaning,
        pronounce,
      };
  
      // Kiểm tra xem giá trị của image có phải là chuỗi rỗng không
      const imageUrl = image.trim();
      if (imageUrl !== '') {
        fieldsToInsert.image = imageUrl;
      }
  
      // Tạo một từ mới trong cơ sở dữ liệu
      const newWord = await Word.create(fieldsToInsert);
  
      res.status(201).json(newWord);
    } catch (error) {
      console.error('Error creating word', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  


  module.exports = {
    getAllWords,
    getWordById,
    searchWordsbyName,
    createWord
  };


// Còn thiếu delete word