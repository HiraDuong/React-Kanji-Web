import React, { useState, useEffect } from "react";

import CourseItem from "../components/courseitem/courseitem";
import SearchCourse from "../components/searchcourse/SearchCourse";

import '../css/CoursePage.css'

function CoursePage() {


  const [searchResults, setSearchResults] = useState([]);

  // Hàm này sẽ nhận dữ liệu từ SearchCourse và cập nhật kết quả tìm kiếm
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div id="coursePage" className="page">
      {/* Truyền hàm handleSearchResults qua SearchCourse */}
      <SearchCourse onSearchResults={handleSearchResults} />
      <div id="search-results-title">Danh sách khóa học:</div>
      {/* Hiển thị kết quả tìm kiếm */}
      <div id="search-results">
        {searchResults.map((course) => (
          // Render mỗi CourseItem với dữ liệu của mỗi khóa học từ kết quả tìm kiếm
          <CourseItem key={course.course_id} course={course} />
        ))}
      </div>
    </div>
  );
}
  
  export default CoursePage;
  