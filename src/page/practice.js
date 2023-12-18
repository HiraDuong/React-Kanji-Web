import React, { useEffect, useState } from 'react';

import '../css/PageGlobal.css';
import '../css/practice.css'
import CourseTitle from "../components/course/CourseTitle";
import Counter from "../components/course/counter";
import Answer from "../components/practice/answer";
import Question from "../components/practice/question";
import kanjiLevels from '../data/kanjiLevels';
import { useLocation,useParams, useNavigate, Link } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import APIpath from '../config/APIpath';

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

  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const courseId = queryParams.get("courseId");
  const href = `/learning?courseId=${courseId}`;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [resetAnswerState, setResetAnswerState] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [courseName,setCourseName] = useState('')
 
  // GET QUIZZES
  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await fetch(`${APIpath}quizzes/${courseId}`);
        const data = await response.json();
        setCourseName(data.courseName)
     

        const shuffledQuizzes = data.Quizz.map((quizz) => ({
          quizz: quizz.quizz,
          answer: shuffleArray([...quizz.answer]),
          correctAnswer : quizz.correctAnswer
        }));
        setQuizzes(shuffledQuizzes);

      } catch (error) {
        console.error('Error fetching quizzes', error);
      }
    };

    getQuizzes();
  }, [courseId]);

  const quizz = quizzes[currentIndex];

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

  
  

  if (courseId === null) {
    return <PageNotFound />;
  }  

  return (
    <div className="page">
      <CourseTitle title={courseName ||""} />
      <Question quizz={quizz?.quizz || ''} />
      <Answer quizAnswer={quizz?.answer || []} answer={quizz?.correctAnswer || ''} resetAnswerState={resetAnswerState} onResetAnswerState={handleResetAnswerState} />
      <Counter num1={currentIndex + 1} num2={quizzes.length} onDecrement={goToPreviousQuestion} onIncrement={goToNextQuestion} />
      <Link to={href}><button className='back-btn'>
        Quay lại khóa học
      </button>
    </Link>
    </div>
  );
}

export default Practice;
