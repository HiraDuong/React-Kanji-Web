import React, { useState } from 'react';

const UploadImage = ({ user, onUpdateAvt }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Xử lý file và gửi nó đến server
      // Sau khi xử lý thành công, cập nhật avt
      onUpdateAvt(file);
      closeUploadModal();
    }
  };

  return (
    <div>
      <div id='user-avt' onClick={openUploadModal}>
        <img src={user.avt} alt='User Avatar' />
      </div>

      {isUploadModalOpen && (
        <div className='upload-modal'>
          <input type='file' onChange={handleFileChange} />
          <button onClick={closeUploadModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
