import './coursePreview.css';  // Assuming that 'coursePreview.css' is in the same directory as your component
import { useUser } from '../../UserContext';
import { Link } from 'react-router-dom';

function CoursePreview({ course }) {

  const { user } = useUser();
 
  const href = `/courseProgress?courseId=${course.course_id}`
  return (
    <Link className="course-preview-container"
    to={href}>
    <div >
      <div className='course-img'>
       <img className='image' src={course.course_image} alt="" />
        {/* Your image rendering logic */}
      </div>
      <div className='name'>
        {course.course_name}
      </div>
      <div className='description'>
        {course.description}
      </div>
    </div>
    </Link>

  );
}

export default CoursePreview;
