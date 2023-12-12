import React, { useState, useEffect } from "react";

import CourseItem from "../components/courseitem/courseitem";


function CoursePage() {
//  CALL API
const [courses, setCourse] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {


      const response = await fetch(`http://localhost:5000/api/courses`, {
        timeout: 5000, // Thời gian chờ tối đa là 5 giây, bạn có thể điều chỉnh giá trị này
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

     

      if (data) {
        setCourse(data);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  fetchData();
}, []);

var course =[]
if(courses){
   course = courses
}
    return (
      <div className="page">
       {course.map(course => (
        <CourseItem
          key={course.course_id}  // Make sure to use a unique key for each CourseItem
          course={course}
        />
      ))}
        {/* <CourseItem name={'Kanji N5'} decription={'kanji n5'} image = 'https://i.redd.it/v88lpnp2gok61.png'/> */}
      </div>
    );
  }
  
  export default CoursePage;
  