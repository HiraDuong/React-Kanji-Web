import RememberButton from '../course/Button'

import './courseitem.css'
function CourseItem({course}){
    const href = `/courseProgress?courseId=${course.course_id}`

    return(
        <div className="course-item">
            <div id='course-image'>
               <img src = {course.course_image}/> 
            </div>
            <div className='text-container'>
                <div id='name'>{course.course_name}</div>
                <div id = 'deciption'>{course.description}</div>
            </div>
            <a  href={href}>
                <button className='open-btn'>Mở</button>
            </a>
        </div>
    )
}

export default CourseItem