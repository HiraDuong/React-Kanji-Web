import React, { useState } from 'react';
import './card.css';

function Card({word}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`cardContainer ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-title">{isFlipped ? word.meaning : word.kanji}</div>
      <div className="pronunce">{word.pronunce}</div>
      <div className="subtitle">{isFlipped ? 'BẤM ĐỂ XEM KANJI' : 'BẤM ĐỂ LẬT'}</div>
    </div>
  );
}

export default Card;
