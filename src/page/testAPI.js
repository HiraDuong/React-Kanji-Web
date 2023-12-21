import React, { useState } from "react";
import SearchCourse from "../components/searchcourse/SearchCourse";
import CourseItem from "../components/courseitem/courseitem";
import ProgressWord from "../components/progressWord/ProgressWord";
import SearchWord from "../components/SearchWord/SearchWord";
import ImageUploader from "../components/ImageUpLoad/ImageUpLoad";

const TestAPI = () => {
  const course = {
    course_id: 5,
    course_name: "Kanji N5",
    description: "this is for N5 level",
    course_image: "https://i.redd.it/v88lpnp2gok61.png",
  };

  const exampleWord = {
    word_id: 1,
    kanji: "漢字",
    meaning: "Chinese characters",
    pronounce: "Kanji",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
  };

  return (
    <div className="page">
      <ImageUploader />
    </div>
  );
};

export default TestAPI;
