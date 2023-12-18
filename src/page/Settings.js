import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import RequireLoginInfo from './RequireLoginInfo';
import { IoClose } from "react-icons/io5";
import "../css/Settings.css"
import { Link } from 'react-router-dom';
import APIpath from '../config/APIpath';
import CoursePreviewList from '../components/CoursePreviewList/CoursePreviewList';
import ImageUploader from '../components/ImageUpLoad/ImageUpLoad';
import { IoCloseOutline } from "react-icons/io5";
const Settings = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Thêm các trường thông tin cần chỉnh sửa vào đây
    password: '', // Thêm các trường thông tin cần chỉnh sửa vào đây
    confirmPassword: '', // Thêm các trường thông tin cần chỉnh sửa vào đây
  });

  const handleCancelEdit = () => {
    // Hủy bỏ chỉnh sửa và đặt lại dữ liệu gốc
    setIsEditing(false);
    setFormData({
      name: '',
      email: '', // Thêm các trường thông tin cần chỉnh sửa vào đây
      password: '', // Thêm các trường thông tin cần chỉnh sửa vào đây
      confirmPassword: '', // Thêm các trường thông tin cần chỉnh sửa vào đây
      // Đặt lại các trường thông tin cần chỉnh sửa vào đây
    });
  };
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    // TODO: Xử lý lưu thông tin đã chỉnh sửa
    // CALL API
    if(formData.password != formData.confirmPassword){
        alert('Mật khẩu và nhập lại mật khẩu không khớp')
    }
    else
    try {
        const response = await fetch(`http://localhost:5000/api/users/${user.userId}`, {
          method: 'PUT', // hoặc 'POST' tùy thuộc vào API của bạn
          headers: {
            'Content-Type': 'application/json',
            // Thêm các headers khác nếu cần
          },
          body: JSON.stringify(formData),
        });
        
        if(response.status ===409){
            alert('Email đã được sử dụng !')
        }
         if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('Cập nhật thông tin thành công !')
        // Xử lý kết quả từ API (response.json())
      setIsEditing(false);

        
      } catch (error) {
        
        console.error('Error saving profile:', error);
        // Xử lý lỗi nếu cần
        alert('Không thể xử lý yêu cầu ! ')
      }

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveProfile();
    }
  };


  // CALL API to get my course
  const [myCourse,setMyCourse] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      try{

        const response = await fetch(`${APIpath}courses/created-by/${user.userId}`)

        const data = await response.json()
        if(data){
          setMyCourse(data)
        }
      }
      catch(error){
        console.error("Không thể lấy dữ liệu")
      }
    }

    fetchData()
  },[user.userId])


// hiển thị mycourse


  useEffect(() => {
    // Fetch data or set myCourse using API
  }, []); // Dependency array ensures the effect runs once after the initial render



// change avt
const [uploadedImageUrl, setUploadedImageUrl] = useState('');

const handleImageUrlChange = (newImageUrl) => {
  setUploadedImageUrl(newImageUrl);
};

  const [showUploadImage, setShowUploadImage] = useState(false);

  const handleAvtClick = () => {
    setShowUploadImage(true);
  };
  
  const handleCloseUploadImage = () => {
    setShowUploadImage(false);
  };

  const handleSaveImageUrl = async()=>{
    //  CALL API here
    try {
      const response = await fetch(`${APIpath}users/${user.userId}`, {
        method: 'PUT', // hoặc 'POST' tùy thuộc vào API của bạn
        headers: {
          'Content-Type': 'application/json',
          // Thêm các headers khác nếu cần
        },
        body: JSON.stringify(
          { email:'',
            name:'',
            avt : uploadedImageUrl
          }
        ),
      });
      
     
       if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Cập nhật avatar thành công !')
      // Xử lý kết quả từ API (response.json())
    setShowUploadImage(false);

      
    } catch (error) {
      
      console.error('Error saving profile:', error);
      // Xử lý lỗi nếu cần
      alert('Không thể xử lý yêu cầu ! ')
    }


  }

  const handleCancelUploadImgUrl = ()=>{
    setUploadedImageUrl('')
    setShowUploadImage(false);
  }


  // Danh sách khóa học đề xuất
 // Call API to get all Course
 const [course, setCourse] = useState([]);

 useEffect(() => {
   const fetchData = async () => {
     try {
 
 
       const response = await fetch(`${APIpath}courses`, {
         timeout: 5000, // Thời gian chờ tối đa là 5 giây, bạn có thể điều chỉnh giá trị này
       });
 
       if (!response.ok) {
         throw new Error("Network response was not ok");
       }
 
       const data = await response.json();
 
      
 
       if (data) {
         setCourse(data);
       }
     } catch (error) {
       console.error("Error fetching course data:", error);
     }
   };
 
   fetchData();
 }, []);

 const getRandomSubset = (arr, size) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

// Get a random subset of 6 courses
const randomCourses = getRandomSubset(course, 6);



  if (!user) return <RequireLoginInfo />;
  else
    return (
      <div className='page'>
        <div id='user-info-container' className={`col ${isEditing ? 'blur-background' : ''}`}>
          <img id='user-background' src='image/user_background.jpg' />
          <div id='user-avt' onClick={() => {
            
            
          handleAvtClick()
          }
            
            }>

          <img  src={user.avt} />
          </div>
          <div id='user-info'>{user.username}
          <div style={{fontSize:"20px"}}>{myCourse.length} Courses</div>
          </div>
          <div id='edit-info-btn' style={{right:40}} className='edit-btn' onClick={handleEditProfile}>
            Edit Profile
          </div>
          <Link to={'/create-course'}><div id='edit-info-btn' style={{right:300}} className='edit-btn' onClick={handleEditProfile}>
            Tạo Khóa học mới
          </div></Link>
        </div>

     
      {
        showUploadImage ?
       (
  
  <div className='img-upload-pop-up-container'>
        <IoCloseOutline style={{cursor:"pointer",padding:"20px"}} onClick={handleCloseUploadImage} size={40}  />

  <ImageUploader display={handleCloseUploadImage} onImageUrlChange={setUploadedImageUrl} />
<div style={{width:'100%',display:'flex' ,gap:'40%', justifyContent:'center',}}>
  <button onClick={handleCancelUploadImgUrl} style={{width:'100px',height:'50px',borderRadius:'15px'}}>CANCEL</button>
  <button onClick={handleSaveImageUrl} style={{width:'100px',height:'50px',borderRadius:'15px'}}>SAVE</button>
  </div>
  </div>
)
  : null

}
      

        <h3>Khóa học của bạn</h3>

        <CoursePreviewList courses={myCourse}/>
        <h3>Khóa học đề xuất</h3>
        <CoursePreviewList  courses={
          
          randomCourses
          
          }/>

        {isEditing ? (
          <div id='edit-profile-form'  onKeyDown={handleKeyDown}>
            <h2>Thay đổi thông tin</h2>
            Tên của bạn:
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
            Địa chỉ email:
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            Mật khẩu mới:
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
            Nhập lại mật khẩu mới:
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <div id='edit-btn-container'>
            <button onClick={handleCancelEdit}>Cancel</button>
            <button onClick={handleSaveProfile}>Save</button>
          
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
};

export default Settings;
