import React, { useState } from 'react';
import './card.css';

function Card({word}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`cardContainer ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-title">{isFlipped ?
       
       <div className='back-card'>
        <img src={word.image}>
        </img>
        {word.meaning}
        </div>
      : word.kanji}</div>
     
     
      <div className="pronunce">{word.pronounce}</div>
    </div>
  );
}

export default Card;
