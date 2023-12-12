import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../css/PageGlobal.css';
import '../css/learning.css';
import CourseTitle from '../components/course/CourseTitle';
import RememberButton from '../components/course/Button';
import Card from '../components/card/card';  
import Counter from '../components/course/counter';

function Learn() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const courseId = queryParams.get('courseId');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [forgot, setForgot] = useState([]);
  const [remember, setRemember] = useState([]);
  const navigate = useNavigate();

  const [cardAPIData, setCardAPIData] = useState([1]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/api/courses/getword/${courseId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCardAPIData(data || []))
      .catch(error => {
        console.error('Error fetching course data:', error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [courseId ]);

    console.log("data :",cardAPIData)
    const { words } = cardAPIData;
    console.log("words :",words)
  return (
    <div className="page">
      <CourseTitle title={'Total Kanji'} />
      <Card word={words && words[currentIndex] ? words[currentIndex] : {}} />

      <div className="btn-container">
        <RememberButton color="rgb(162 155 155)" text="CHƯA NHỚ"  />
        <RememberButton color="rgb(22 73 235)" text="ĐÃ NHỚ"  />
      </div>
      <Counter num1={currentIndex + 1} num2={words ? words.length : 1}
  />

      <button className={`go-to-practice ${isFinished ? 'visible' : 'hidden'}`} >
        Chuyển tới trang luyện tập
      </button>
    </div>
  );
}

export default Learn;
