
import React, { useState } from 'react'
import { useUser } from '../UserContext'
import '../css/CreateCourse.css'
import '../css/PageGlobal.css'
import PageNotFound from './PageNotFound'
import { Link } from 'react-router-dom'

const CreateCoursePage = ()=>{
    const {user} = useUser()

    // Lưu thông tin cơ bản về khóa học
    const [courseData,setCourseData] = useState(
        {  create_by: user.name,
            course_name: '',
            description:'',
            course_image:'',

        }
    )
    // Lưu thông tin về các words trong khóa học 
    // (mảng này chỉ chứa id word)
    const [wordsCourseData,setWordsCourseData] = useState([])


    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({ ...prevData, [name]: value }));
      };

    const handleSaveInfo = async()=>{
        console.log("Course Data", courseData)
        console.log("Words Data",wordsCourseData)
        
        //  Đoạn này sẽ gọi API
        
    }
    const handleCancelSave = () =>{
        //  set về mặc định
        setCourseData(
            {  create_by: user.name,
                course_name: '',
                description:'',
                course_image:'',
    
            }
        )
        setWordsCourseData([0])
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveInfo()
        }
      };
    

// Tạm thời cho phép tất cả user quyền tạo khóa học
    if(user === null )
    return <PageNotFound/>

    return(
        <div className='page'>
            <h2>
                Tạo khóa học
            </h2>
            <div className='row'>
            <div className='create-course-header'>
                Tên khóa học
                <input
              type='text'
              name='course_name'
              value={courseData.course_name}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            Mô tả 
            <input
              type='text'
              name='description'
              value={courseData.description}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />

            </div>
            <div>

            <img className='create-course-img' src='/image/default_img.png'/>
            <Link className='create-word-btn' to='admin/create-word'>THÊM THẺ MỚI</Link>
            </div>

            </div>
            <div className='word-search-results'>

            </div>

            <div className='create-course-submit-btn-container'>
            <button  onClick={handleCancelSave}>HỦY BỎ</button>
            <button  onClick={handleSaveInfo}>TẠO KHÓA HỌC</button>
                </div>
        </div>
    )
}

export default CreateCoursePage