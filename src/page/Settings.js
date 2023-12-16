import React, { useState } from 'react';
import { useUser } from '../UserContext';
import RequireLoginInfo from './RequireLoginInfo';
import { IoClose } from "react-icons/io5";
import "../css/Settings.css"
import UploadImage from '../components/uploadImage/UploadImage';
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

  if (!user) return <RequireLoginInfo />;
  else
    return (
      <div className='page'>
        <div id='user-info-container' className={`col ${isEditing ? 'blur-background' : ''}`}>
          <img id='user-background' src='image/user_background.jpg' />
          <div id='user-avt' onClick={() => alert('Xin lỗi, chức năng chỉnh sửa avt đang được hoàn thiện!')}>

          <img  src={user.avt} />
          </div>
          <div id='user-info'>{user.username}</div>
          <div id='edit-info-btn' className='edit-btn' onClick={handleEditProfile}>
            Edit Profile
          </div>
        </div>

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
            <div id='close-button' onClick={handleCancelEdit}>
              <IoClose/></div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
};

export default Settings;
