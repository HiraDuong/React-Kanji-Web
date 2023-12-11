import './coursePreview.css';  // Assuming that 'coursePreview.css' is in the same directory as your component

function CoursePreview({ name, description,image }) {
  return (
    <a href={`./learning/${name}`}>
    <div className='container'>
      <div className='course-img'>
       <img className='image' src={image} alt="" />
        {/* Your image rendering logic */}
      </div>
      <div className='name'>
        {name}
      </div>
      <div className='description'>
        {description}
      </div>
    </div>
    </a>

  );
}

export default CoursePreview;
