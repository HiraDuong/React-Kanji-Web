import { useParams } from "react-router-dom";
import { useState,useEffect  } from "react";

import '../css/testAPI.css'
const TestAPI = ()=>{
    const { level } = useParams();
    const [courseData, setCourseData] = useState(null);

    // CALL API

    useEffect(() => {
        // Gọi API để lấy thông tin về khóa học dựa trên level
        fetch(`http://localhost:4000/api/courses/name/${level || "Kanji Total"}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => setCourseData(data))
          .catch((error) => console.error("Error fetching course data:", error));
      }, [level]);
      
      console.log(courseData)

    return(
<div className="page">
      <h2>{level} Course</h2>
      {courseData ? (
        <div>
          <p>Name: {courseData.name}</p>
          <p>Description: {courseData.description}</p>
          {/* Hiển thị các từ vựng, ví dụ: */}
          <ul className="list">
            {courseData.word.map((word) => (
              <li key={word.kanji}>
                {word.kanji} - {word.meaning}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  
    )
}

export default TestAPI