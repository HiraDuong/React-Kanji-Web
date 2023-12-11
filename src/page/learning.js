import React, { useState, useEffect } from 'react';
import '../css/PageGlobal.css';
import '../css/learning.css';
import CourseTitle from '../components/course/CourseTitle';
import RememberButton from '../components/course/Button';
import Card from '../components/card/card';  
import Counter from '../components/course/counter';

const cardData = [
  {
    kanji: '日',
    meaning: 'sun',
    pronunce: 'nichi',
  },
  {
    kanji: '本',
    meaning: 'book',
    pronunce: 'hon',
  },
  {
    kanji: '山',
    meaning: 'mountain',
    pronunce: 'yama',
  },
];

function Learning() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [forgot, setForgot] = useState([]);
  const [remember, setRemember] = useState([]);

  useEffect(() => {
    console.log('Remember:', remember);
    console.log('Forgot:', forgot);
  }, [remember, forgot]);

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cardData.length - 1));
  };

  const handlePrevCard = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRememberOrForgot = (isRemember) => {
    const currentCard = cardData[currentIndex];

    if (isRemember) {
      setRemember((prevRemember) => [...prevRemember, currentCard]);
    } else {
      setForgot((prevForgot) => [...prevForgot, currentCard]);
    }

    handleNextCard();
  };

  const handleRemember = () => {
    handleRememberOrForgot(true);
  };

  const handleForgot = () => {
    handleRememberOrForgot(false);
  };

  return (
    <div className="page">
      <CourseTitle title={'Kanji n5'} />
      <Card kanji={cardData[currentIndex].kanji} meaning={cardData[currentIndex].meaning} pronunce={cardData[currentIndex].pronunce}/>
      <div className="btn-container">
        <RememberButton color="rgb(162 155 155)" text="CHƯA NHỚ" onClick={handleForgot}/>
        <RememberButton color="rgb(22 73 235)" text="ĐÃ NHỚ" onClick={handleRemember} />
      </div>
      <Counter num1={currentIndex + 1} num2={cardData.length} onDecrement={handlePrevCard} onIncrement={handleNextCard} />
    </div>
  );
}

export default Learning;
