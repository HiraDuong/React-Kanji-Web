import './coursePreview.css';  // Assuming that 'coursePreview.css' is in the same directory as your component

function CoursePreview({ course }) {
  const href = `/courseProgress?courseId=${course.course_id}`
  return (
    <a href={href}>
    <div className='container'>
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
    </a>

  );
}

export default CoursePreview;
