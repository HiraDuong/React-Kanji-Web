import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProgressWord from '../components/progressWord/ProgressWord';

import '../css/courseProgress.css';
import N1Kanji from '../data/kanji/kanjiN1';

function CourseProgress() {
  const { search } = useLocation();
  const { level } = useParams();

  const queryParams = new URLSearchParams(search);
  const courseId = queryParams.get("courseId");
  const href = `/learning?courseId=${courseId}`;

  // Call API
  const [courses, setCourses] = useState(null);

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

  // Kiểm tra nếu courses không null hoặc undefined thì sử dụng courses[0], ngược lại sử dụng mảng rỗng
  const course = courses ? courses[0] : {};

  return (
    <div className='page'>
      <div className='header-container'>
        <div className='title-container'>
          Tên khóa học: {course.course_name || "Total Kanji"}
        </div>
        <div className='info-container'>
          <div className='description-container'>
            <div className='text'>Mô tả:</div>
            <div className='description--'>
              {course.description}
            </div>
          </div>
          <div className='image-container-prg'>
            <img src={course.course_image} alt={`Image for ${course.course_name}`} />
          </div>
        </div>
        <div className='progress-btn-container'>
          <a href={href}>
            <button className='progress-btn'>
              HỌC
            </button>
          </a>
          <a href='/coursePage'>
            <button className='progress-btn'>
              THOÁT
            </button>
          </a>
        </div>
      </div>
      <div className='remember-container'>
        <div className='progress-title'>
          Từ đã nhớ
        </div>
        {N1Kanji.map(N1Kanji => (
          <ProgressWord
            word={N1Kanji}
            key={N1Kanji.id}
          />
        ))}
      </div>
      <div className='forgot-container'>
        <div className='progress-title'>
          Từ chưa nhớ
        </div>
        {N1Kanji.map(N1Kanji => (
          <ProgressWord
            word={N1Kanji}
            key={N1Kanji.id}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseProgress;
