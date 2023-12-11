import RememberButton from '../course/Button'

import './courseitem.css'
function CourseItem({course}){

    return(
        <div className="course-item">
            <div id='course-image'>
               <img src = {course.image}/> 
            </div>
            <div className='text-container'>
                <div id='name'>{course.name}</div>
                <div id = 'deciption'>{course.decription}</div>
            </div>
            <a  href={`./courseProgress/${course.name}`}>
                <button className='open-btn'>Mở</button>
            </a>
        </div>
    )
}

export default CourseItem