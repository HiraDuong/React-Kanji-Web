import React, { useState, useEffect } from "react";

import CoursePreview from "../components/coursePreview/coursePreview";
import "../css/homepage.css";

import { useUser } from "../UserContext";
import SearchCourse from "../components/searchcourse/SearchCourse";
import APIpath from "../config/APIpath";
import CoursePreviewList from "../components/CoursePreviewList/CoursePreviewList";

function HomePage() {
  const { user } = useUser();

  // Call API to get all Course
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIpath}courses`, {
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

  return (
    <div className="page" style={{ width: "100%" }}>
      <img id="home-background" src="image/home.png" alt="Home" />
      <h3 style={{ marginLeft: "40px" }}>Khóa học đề xuất</h3>
      <CoursePreviewList courses={course} />
    </div>
  );
}

export default HomePage;
