import CourseItem from "../components/courseitem/courseitem";
const course = [
  {
   name : 'Kanji N5',
   decription : 'this is for N5 level',
   image : 'https://i.redd.it/v88lpnp2gok61.png' 
  },
  {
    name : 'Kanji N4',
    decription : 'this is for N4 level',
    image : 'https://i.redd.it/v88lpnp2gok61.png' 
   },
   {
    name : 'Kanji N3',
    decription : 'this is for N3 level',
    image : 'https://i.redd.it/v88lpnp2gok61.png' 
   },
   {
    name : 'Kanji N2',
    decription : 'this is for N2 level',
    image : 'https://i.redd.it/v88lpnp2gok61.png' 
   },
   {
     name : 'Kanji N1',
     decription : 'this is for N1 level',
     image : 'https://i.redd.it/v88lpnp2gok61.png' 
    },
    {
     name : 'Kanji Total',
     decription : 'this is for N5-N1 level',
     image : 'https://i.redd.it/v88lpnp2gok61.png' 
    },
]
function CoursePage() {
    return (
      <div className="page">
       {course.map(course => (
        <CourseItem
          key={course.name}  // Make sure to use a unique key for each CourseItem
          name={course.name}
          decription={course.decription}
          image={course.image}
        />
      ))}
        {/* <CourseItem name={'Kanji N5'} decription={'kanji n5'} image = 'https://i.redd.it/v88lpnp2gok61.png'/> */}
      </div>
    );
  }
  
  export default CoursePage;
  