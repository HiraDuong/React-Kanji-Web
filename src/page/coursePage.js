import CourseItem from "../components/courseitem/courseitem";
import course from "../data/course";

function CoursePage() {
    return (
      <div className="page">
       {course.map(course => (
        <CourseItem
          key={course.name}  // Make sure to use a unique key for each CourseItem
          course={course}
        />
      ))}
        {/* <CourseItem name={'Kanji N5'} decription={'kanji n5'} image = 'https://i.redd.it/v88lpnp2gok61.png'/> */}
      </div>
    );
  }
  
  export default CoursePage;
  