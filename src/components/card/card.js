import React, { useState } from 'react';
import CardFlip from 'react-card-flip';
import './card.css';

function Card({ word }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="cardContainer" onClick={handleFlip}>
        <div className="card-title">{word.kanji}</div>
        <div className="pronounce">{word.pronounce}</div>
      </div>

      <div className="cardContainer" onClick={handleFlip}>
        <div className='back-card'>
          <img src={word.image} alt={`Image for ${word.kanji}`} />
          {word.meaning}
        </div>
        <div>BẤM ĐỂ LẬT</div>
      </div>
    </CardFlip>
  );
}

export default Card;
