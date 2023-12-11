import React, { useEffect, useState } from 'react';
import '../css/PageGlobal.css';
import '../css/practice.css'
import CourseTitle from "../components/course/CourseTitle";
import Counter from "../components/course/counter";
import Answer from "../components/practice/answer";
import Question from "../components/practice/question";
import kanjiLevels from '../data/kanjiLevels';
import { useParams, useNavigate } from 'react-router-dom';

// Di chuyển hàm getRandomElements lên trước hàm createQuizz
const getRandomElements = (array, numElements) => {
  const shuffledArray = shuffleArray(array);
  return shuffledArray.slice(0, numElements);
};

// Hàm để trộn mảng
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function Practice() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetAnswerState, setResetAnswerState] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const cardData = kanjiLevels[level || 'Kanji Total'] || [];
    const newQuizzes = createQuizz(cardData);
    setQuizzes(newQuizzes);
  }, [level, currentIndex]);

  const quiz = quizzes[currentIndex];

  const goToNextQuestion = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, quizzes.length - 1));
    setResetAnswerState(true);
  };

  const goToPreviousQuestion = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setResetAnswerState(true);
  };

  const handleResetAnswerState = () => {
    setResetAnswerState(false);
  };

  // Hàm createQuizz sử dụng getRandomElements, vì vậy di chuyển nó lên trước createQuizz
  const createQuizz = (cardData) => {
    const quizzes = cardData.map((card) => {
      const correctAnswer = card.meaning;
      const incorrectAnswers = cardData
        .filter((c) => c.meaning !== correctAnswer)
        .map((c) => c.meaning);
      const randomIncorrectAnswers = getRandomElements(incorrectAnswers, 3);
      const quizAnswer = shuffleArray([correctAnswer, ...randomIncorrectAnswers]);

      return {
        quiz: card.kanji,
        quizAnswer,
        answer: correctAnswer,
      };
    });

    return quizzes;
  };

  return (
    <div className="page">
      <CourseTitle title={level ||"Total Kanji"} />
      <Question quiz={quiz?.quiz || ''} />
      <Answer quizAnswer={quiz?.quizAnswer || []} answer={quiz?.answer || ''} resetAnswerState={resetAnswerState} onResetAnswerState={handleResetAnswerState} />
      <Counter num1={currentIndex + 1} num2={quizzes.length} onDecrement={goToPreviousQuestion} onIncrement={goToNextQuestion} />
      <a  href={`/learning/${level ||""}`}><button className='back-btn'>
        Quay lại khóa học
      </button>
    </a>
    </div>
  );
}

export default Practice;
