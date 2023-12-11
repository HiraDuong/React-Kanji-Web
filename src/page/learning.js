import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/PageGlobal.css';
import '../css/learning.css';
import CourseTitle from '../components/course/CourseTitle';
import RememberButton from '../components/course/Button';
import Card from '../components/card/card';  
import Counter from '../components/course/counter';
import kanjiLevels from '../data/kanjiLevels';

function Learning() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [forgot, setForgot] = useState([]);
  const [remember, setRemember] = useState([]);
  const { level } = useParams();
  const navigate = useNavigate();


  // Thêm state để kiểm soát việc hiển thị nút
  const [isFinished, setIsFinished] = useState(false);


  console.log("Level : ",level)

  const cardData = kanjiLevels[level ||'Kanji Total'] || [];

  useEffect(() => {
    console.log('Remember:', remember);
    console.log('Forgot:', forgot);

    // Kiểm tra xem đã học hết chưa
    const totalLearnedWords = remember.length + forgot.length;
    setIsFinished(totalLearnedWords === cardData.length); 
    if (totalLearnedWords === cardData.length) {
      console.log('Học hết rồi, hiển thị nút chuyển trang luyện tập');
      // Hiển thị nút chuyển trang luyện tập hoặc thực hiện hành động chuyển trang
    }
  }, [remember, forgot, cardData]);

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cardData.length - 1));
  };

  const handlePrevCard = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRememberOrForgot = (isRemember) => {
    const currentCard = cardData[currentIndex];
  
    // Kiểm tra xem từ hiện tại đã có trong mảng remember hoặc forgot chưa
    const isAlreadyRemembered = remember.some(
      (item) => item.kanji === currentCard.kanji
    );
  
    const isAlreadyForgotten = forgot.some(
      (item) => item.kanji === currentCard.kanji
    );
  
    if (isRemember && !isAlreadyRemembered) {
      setRemember((prevRemember) => [...prevRemember, currentCard]);
    } else if (!isRemember && !isAlreadyForgotten) {
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

  // Hàm xử lý khi chuyển tới trang luyện tập
  const handleGoToPractice = () => {
    // Thực hiện hành động chuyển trang hoặc hiển thị thông báo
    console.log('Chuyển tới trang luyện tập');
    navigate(`/practice/${level}`);
 // Ví dụ chuyển trang sử dụng hook useNavigate
  };

  return (
    <div className="page">
      <CourseTitle title={level || "Total Kanji"} />
      <Card
word={cardData[currentIndex]}
/>
      <div className="btn-container">
        <RememberButton color="rgb(162 155 155)" text="CHƯA NHỚ" onClick={handleForgot}/>
        <RememberButton color="rgb(22 73 235)" text="ĐÃ NHỚ" onClick={handleRemember} />
      </div>
      <Counter num1={currentIndex + 1} num2={cardData.length} onDecrement={handlePrevCard} onIncrement={handleNextCard} />
      
      <button
        className={`go-to-practice ${isFinished ? 'visible' : 'hidden'}`}
        onClick={handleGoToPractice}
      >
        Chuyển tới trang luyện tập
      </button>

    </div>
  );
}

export default Learning;
