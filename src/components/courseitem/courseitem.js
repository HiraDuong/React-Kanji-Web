import './courseitem.css'
function CourseItem({name,decription,image}){

    return(
        <div className="course-item">
            <div id='course-image'>
               <img src = {image}/> 
            </div>
            <div>
                <div id='name'>{name}</div>
                <div id = 'deciption'>{decription}</div>
            </div>

        </div>
    )
}

export default CourseItem