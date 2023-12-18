import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpLoad.css';
import { IoCloseOutline } from "react-icons/io5";
import imgBBKey from '../../ThirdAPI/imgBB-key';
const ImageUploader = ({ display, onImageUrlChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${imgBBKey}`, formData);

      const newImageUrl = response.data.data.url;

      setImageUrl(newImageUrl);

      // Call the callback with the new image URL
      onImageUrlChange(newImageUrl);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className= "image-uploader-container">
   { display ?
      <div>
        <h1>Tải ảnh lên</h1>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button onClick={handleUpload}>Upload Image</button>
        {imageUrl && <div className="image-preview">
          
          <img src={imageUrl} alt="Uploaded" /></div>}
      </div> : 
      null}

    <div className='close-btn-container' onClick={()=>{
      display = null
    }}>
      </div>  
    </div>

      
  );
};

export default ImageUploader;
