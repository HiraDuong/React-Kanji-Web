const Word = require("../models/wordModel");

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
  

  // search words 
  const searchWords = async(req,res) =>{
    
  } 

  module.exports = {
    getAllWords,
    getWordById,
  };


