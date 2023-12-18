import './ProgressWord.css';

const ProgressWord = ({ word }) => {
  return (
    <div id='word-container'>
        <div id='title'>
          {word.kanji? word.kanji:'Kanji'}
        </div>
      <div id='word-info-container'>
        <div id='meaning'>
           Meaning: {word.meaning}
        </div>
        <div id='pronunce'>
          Pronounce: {word.pronounce}
        </div>
      </div>
        <img id='image-container' src={word.image? word.image:'/image/default_img.png' } alt={`Image for ${word.kanji}`} />
    </div>
  );
};

export default ProgressWord;
