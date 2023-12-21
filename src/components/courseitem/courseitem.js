import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./courseitem.css";
function CourseItem({ course }) {
  const { user } = useUser();
  const href = `/courseProgress?courseId=${course.course_id}`;

  return (
    <div id="course-item">
      <div id="course-image">
        <img src={course.course_image} />
      </div>
      <div id="text-container">
        <div id="course-name">{course.course_name}</div>
        <div id="desciption">{course.description}</div>
      </div>
      <Link id="button-container" to={href}>
        <button className="open-btn">Mở</button>
      </Link>
    </div>
  );
}

export default CourseItem;
