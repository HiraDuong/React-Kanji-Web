import React, { useState } from 'react';
import './card.css';

function Card({ kanji, meaning, pronunce}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`cardContainer ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-title">{isFlipped ? meaning : kanji}</div>
      <div className="pronunce">{pronunce}</div>
      <div className="subtitle">{isFlipped ? 'BẤM ĐỂ XEM KANJI' : 'BẤM ĐỂ LẬT'}</div>
    </div>
  );
}

export default Card;
