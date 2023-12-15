import React, { useState, useEffect } from "react";


import CoursePreview from "../components/coursePreview/coursePreview";
import '../css/homepage.css'

import { useUser } from '../UserContext';


function HomePage() {


  const { user } = useUser();



  // Call API to get all Course
  const [course, setCourse] = useState(null);

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

  var firstCourses=[]
  var secondCourses=[]
  if(course){
     firstCourses = course.slice(0, 3);
     secondCourses = course.slice(3, 6);
  }


    return (
      <div style={{width:'100%'}}>
        <img id="home-background" src='image/home.png' alt="Home" />
        <div className="row">
        {firstCourses.map(course => (
        <CoursePreview
          key={course.course_id}  // Make sure to use a unique key for each CourseItem
          course={course}
          
        />
      ))}
        </div>
        <div className="row">
        {secondCourses.map(course => (
        <CoursePreview
          key={course.course_id}  // Make sure to use a unique key for each CourseItem
          course={course}
        />
      ))}
        </div>
      </div>
    );
  }
  
  export default HomePage;
  