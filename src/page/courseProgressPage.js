import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ProgressWord from '../components/progressWord/ProgressWord';

import '../css/courseProgress.css';
import N1Kanji from '../data/kanji/kanjiN1';
import PageNotFound from './PageNotFound';
import { useUser } from '../UserContext';
import RequireLoginInfo from './RequireLoginInfo';
import Chart from '../components/chart/Chart';
import MyChart from '../components/chart/Chart';

function CourseProgress() {

  const { user } = useUser();

  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const courseId = queryParams.get("courseId");
  

  const href = `/learning?courseId=${courseId}`;

  // Call API
  const [courses, setCourses] = useState(null);
  const [words, setWords] = useState(null);

  const [remembers, setRemember] = useState(null);
  const [notRemembers, setNotRemember] = useState(null);

//  Lấy thông tin khóa học by Id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/courseId/${courseId}`, {
          timeout: 5000,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data) {
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [courseId]);

// Lấy word by courseId

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/getword/${courseId}`, {
        timeout: 5000,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data) {
        setWords(data);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  fetchData();
}, [courseId]);

//  Lấy thông tin từ đã nhớ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/userProgress/Remember/uc/${user.userId}/${courseId}`, {
          timeout: 5000,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data) {
          setRemember(data);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [courseId]);
// Lấy thông tin từ chưa nhớ
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/userProgress/NotRemember/uc/${user.userId}/${courseId}`, {
        timeout: 5000,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data) {
        setNotRemember(data);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  fetchData();
}, [courseId]);


  // Kiểm tra nếu courses không null hoặc undefined thì sử dụng courses[0], ngược lại sử dụng mảng rỗng
  const course = courses ? courses[0] : {};
  const wordItem = words ? words.words : {};

  const remember = remembers? remembers:[]
  const notRemember = notRemembers? notRemembers:[]

  const totalWordLength = wordItem.length
  const rememberWordLength = remember.length
  const notRememberWordLength = notRemember.length

// change course createdDate format 

const date = new Date(course.createdAt);
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('vi-VN', options);


  if(user == null){
    return <RequireLoginInfo/>
  }
  else
  if (courseId === null) {
    return <PageNotFound />;
  }  
  
  else
  return (
    <div className='page'>

      <div id='header-container'>
        <div id='title-container'>
          Tên khóa học: {course.course_name || "Total Kanji"}
        </div>
        <div id='info-container'>
          <div id='description-container'>
            <div id='text'>Mô tả:</div>
            <div className='progress-course-description'>
              {course.description}
            </div>
            <div id='text'>Tác giả:</div>
            <div className='progress-course-description'>
              {course.create_by}
            </div>
            <div id='text'>Ngày tạo:</div>
            <div className='progress-course-description'>
              {formattedDate}
            </div>
          </div>
          <img id='image-container-prg' 
          src={course.course_image} alt={`Image for ${course.course_name}`} />
             <div className='chart-container'>
        
        <MyChart
          totalWordLength={totalWordLength}
          rememberWordLength={rememberWordLength}
          notRememberWordLength={notRememberWordLength}
        />
      </div>
        </div>
        

        <div id='progress-btn-container'>

        <Link className='progress-btn' to='/coursePage'>
            
            THOÁT
         
        </Link>
         <Link className='progress-btn' to={href}>
            
              HỌC
           
          </Link>
      
        </div>
      </div>
 


      <div className='progress-word-container' id='remember-container'>
        <div className='progress-title'>
          Từ đã nhớ
        </div>
        <div>
        {remember.map(remember => (
          <ProgressWord
            word={remember}
            key={remember.kanji}
          />
        ))}
        </div>
      </div>
      <div className='progress-word-container' id='forgot-container'>
        <div style={{color:'#f7821b'}}
        className='progress-title'>
          Từ chưa nhớ
        </div>
        <div>
        {notRemember.map(notRemember => (
          <ProgressWord
            word={notRemember}
            key={notRemember.kanji}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default CourseProgress;
