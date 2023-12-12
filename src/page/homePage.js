import React, { useState, useEffect } from "react";


import CoursePreview from "../components/coursePreview/coursePreview";
import '../css/homepage.css'



function HomePage() {

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
      <div className="page">
        <div className="image-container">
        <img src="https://s3-alpha-sig.figma.com/img/2e61/496d/5e185e55312c5217ce33a304fda6106e?Expires=1702857600&Signature=btogyWoZLameNFfadYb6K3pjegir59dKUU4~OfGaU-Crg6Z7D5OXPO9Tc4U-FMuo85KSiqa4c5Z8dUt~Hs93W7fCVpln1qc7F2veKkrWAw89ROydBpmg2WdZZctp5XbAH5tvQFHM-S78vT6UMPKieP88RN9iCF-P9DeRD3KTd4ig50RTyebl42KE7J~TCcixn-dy~t3i0UUvRE2xql7LQ8JyY4uQlkBHrJhm1hQlSaXn9mM5MwmguCqrUjO7TXH538czZ-r25s~UpX0QH~myzXCtPH7-sy6rOEKsr0vR7dJnim5A~nZptsatknTdZd5~CBkvGPL0oaIpdp7HvKsYPA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="Home" />
        </div>
        <div className="col">
        {firstCourses.map(course => (
        <CoursePreview
          key={course.name}  // Make sure to use a unique key for each CourseItem
          course={course}
        />
      ))}
        </div>
        <div className="col">
        {secondCourses.map(course => (
        <CoursePreview
          key={course.name}  // Make sure to use a unique key for each CourseItem
          course={course}
        />
      ))}
        </div>
      </div>
    );
  }
  
  export default HomePage;
  