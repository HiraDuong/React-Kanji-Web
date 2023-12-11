import './coursePreview.css';  // Assuming that 'coursePreview.css' is in the same directory as your component

function CoursePreview({ course }) {
  return (
    <a href={`/courseProgress/${course.name}`}>
    <div className='container'>
      <div className='course-img'>
       <img className='image' src={course.image} alt="" />
        {/* Your image rendering logic */}
      </div>
      <div className='name'>
        {course.name}
      </div>
      <div className='description'>
        {course.description}
      </div>
    </div>
    </a>

  );
}

export default CoursePreview;
