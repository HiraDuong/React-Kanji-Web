import './ProgressWord.css';

const ProgressWord = ({ word }) => {
  return (
    <div id='word-container'>
        <div id='title'>
          {word.kanji}
        </div>
      <div id='word-info-container'>
        <div id='meaning'>
           Meaning: {word.meaning}
        </div>
        <div id='pronunce'>
          Pronounce: {word.pronounce}
        </div>
      </div>
        <img id='image-container' src={word.image} alt={`Image for ${word.kanji}`} />
    </div>
  );
};

export default ProgressWord;
