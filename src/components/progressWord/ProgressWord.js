import './ProgressWord.css';

const ProgressWord = ({ word }) => {
  return (
    <div className='word-container'>
      <div className='info-container'>
        <div className='title'>
          {word.kanji}
        </div>
        <div className='meaning'>
          {word.meaning}
        </div>
        <div className='pronunce'>
          {word.pronunce}
        </div>
      </div>
      <div className='image-container-prg-word'>
        <img src={word.image} alt={`Image for ${word.kanji}`} />
      </div>
    </div>
  );
};

export default ProgressWord;
