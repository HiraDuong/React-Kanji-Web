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
import { IoClose } from "react-icons/io5";
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
  const [quizzes, setQuizzes] = useState([1]);
  const [courseName,setCourseName] = useState('')
  // Danh sách câu đã trả lời
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  // điểm 
  const [score,setScore] = useState(0)

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

  
  // Tính giờ 
  // Thêm state cho checkbox và thời gian hiện tại
const [timerEnabled, setTimerEnabled] = useState(false);
const [timerSeconds, setTimerSeconds] = useState(15);
const [timerInterval, setTimerInterval] = useState(null);

// Cập nhật useEffect để bắt đầu và dừng đồng hồ đếm
useEffect(() => {
  if (timerEnabled) {
    setTimerInterval(setInterval(() => {
      setTimerSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000));
    
  } else {
    clearInterval(timerInterval);
    setTimerSeconds(15);
  }

  // Clear interval khi component unmount
  return () => clearInterval(timerInterval);
}, [timerEnabled]);

// Thêm hàm để xử lý chuyển câu hỏi sau mỗi 15 giây
const handleAutoNextQuestion = () => {
  if (timerEnabled && timerSeconds === 0) {
    goToNextQuestion();
    setResetAnswerState(true);
    setTimerSeconds(15);
  }
};
// Gọi hàm handleAutoNextQuestion trong useEffect
useEffect(() => {
  handleAutoNextQuestion();
}, [timerSeconds]);


const [congratVisible, setCongratVisible] = useState(false);
const [hasShownCongrat, setHasShownCongrat] = useState(false);  // Thêm biến này

if (answeredQuestions.length === quizzes.length && !hasShownCongrat) {
  setCongratVisible(true);
  setHasShownCongrat(true);  // Đánh dấu rằng đã hiển thị
}


  const handleCloseCongrat = () => {
    setCongratVisible(false);
    // Có thể thực hiện các hành động khác nếu cần
  };


  if (courseId === null) {
    return <PageNotFound />;
  }  

  return (
    <div className={`page`}>
    <div className='row'
    
    style={{width:'100%',justifyContent:'center',alignItems:'center',}} >
      
      <CourseTitle title={courseName ||""} />
<div style={{marginLeft:'10px', display:'flex',alignItems:'center'}}>
  Điểm: {score}</div>
      
      <input
  type="checkbox"
  style={{width:'30px',height:'30px',margin:'0 10px',cursor:'pointer',}}
  id="timerCheckbox"
  checked={timerEnabled}
  onChange={() => setTimerEnabled(!timerEnabled)}
/>
<div htmlFor="timerCheckbox" >Tính giờ</div>

{timerEnabled && <div style={{marginLeft:'10px'}}>
  Thời gian còn lại: {timerSeconds} giây</div>}
</div>
<div className={`page ${congratVisible ? "congrat-visible" : ""}`}>

      <Question quizz={quizz?.quizz || ''} />
      <Answer quizAnswer={quizz?.answer || []} 
      answer={quizz?.correctAnswer || ''} 
      resetAnswerState={resetAnswerState} 
      onResetAnswerState={handleResetAnswerState}
      score={score}
      setScore={setScore}
      answeredQuestions={answeredQuestions}
      setAnsweredQuestions={setAnsweredQuestions}
      QuestionIndex={currentIndex} />
<Counter
  num1={currentIndex + 1}
  num2={quizzes.length}
  onDecrement={timerEnabled ? null: goToPreviousQuestion }
  onIncrement={timerEnabled ?null :goToNextQuestion }
/>

      <Link to={href}><button className='back-btn'>
        Quay lại khóa học
      </button>
    </Link>
  
    </div>

    {
  congratVisible &&(
    <div className='congrat-container'>
      <IoClose
        size={30}
        style={{ cursor: 'pointer', 
      position:'absolute',top:'20',right:'20'
      }}
        onClick={handleCloseCongrat}
      />
      CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH!
      <br/>
      ĐIỂM CỦA BẠN LÀ {score}
    <img src='/image/congrats.gif'/>
    <Link
      style={{marginTop:'20px'}}
    to={href}><button className='back-btn'>
        Quay lại khóa học
      </button>
    </Link>
    </div>
  )
}

    </div>

  );
}

export default Practice;
