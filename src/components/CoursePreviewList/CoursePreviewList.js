import React, { useEffect, useState } from 'react';

import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import CoursePreview from "../coursePreview/coursePreview";
import './CoursePreviewList.css'
const CoursePreviewList = ({ courses }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const coursesPerPage = 3; 
    const handleNext = () => {
  
        const nextIndex = currentIndex + coursesPerPage;
        if (nextIndex < courses.length) {
          setCurrentIndex(nextIndex);
        }
    
      };
    
      const handlePrev = () => {
        
        const prevIndex = currentIndex - coursesPerPage;
        if (prevIndex >= 0) {
          setCurrentIndex(prevIndex);
        }
      };
    
  
    return (
    


    <div className='My-Course-Container row'>
      <div style={{ cursor: "pointer", color: "white" }}>
        <IoCaretBackOutline size={40} onClick={handlePrev} />
      </div>

      {courses.length > 0 ? (
        <div style={{ width: '90%' }}>
          {courses.slice(currentIndex, currentIndex + coursesPerPage).map(course => (
            <div style={{ display: "inline-block", margin: "10px" }} key={course.course_id}>
              <CoursePreview course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ width: '90%', color:'white'}}>Bạn chưa tạo khóa học nào</div>
      )}

      <div style={{ cursor: "pointer", color: "white" }}>
        <IoCaretForwardOutline size={40} onClick={handleNext} />
      </div>
    </div>
  );
};

export default CoursePreviewList;
