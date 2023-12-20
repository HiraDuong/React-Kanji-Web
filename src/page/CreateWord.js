import { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import "../css/CreateWord.css";
import PageNotFound from "./PageNotFound";
import RequireLoginInfo from "./RequireLoginInfo";
import ProgressWord from "../components/progressWord/ProgressWord";
import APIpath from "../config/APIpath";
import { IoCloseOutline } from "react-icons/io5";
import ImageUploader from "../components/ImageUpLoad/ImageUpLoad";
import { Link } from "react-router-dom";

const CreateWordPage = () => {
  const { user } = useUser();

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [wordData, setWordData] = useState({
    kanji: "",
    meaning: "",
    pronounce: "",
    example: "",
    image: "",
  });

  useEffect(() => {
    // Mỗi khi uploadedImageUrl thay đổi, cập nhật giá trị trong wordData
    setWordData((prevData) => ({ ...prevData, image: uploadedImageUrl }));
  }, [uploadedImageUrl]);

  // change course img

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

  const handleCancelUploadImgUrl = () => {
    setUploadedImageUrl("");
    setShowUploadImage(false);
  };

  const handleSaveWord = async () => {
    //  CALL API here
    try {
      const response = await fetch(`${APIpath}words`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wordData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error creating word: ${errorData.error}`);
      }

      const responseData = await response.json();
      alert(
        `Tạo từ mới thành công: ${wordData.kanji}, ${wordData.meaning} , ${wordData.pronounce}`
      );
    } catch (error) {
      alert("Từ đã tồn tại !");
      console.error(error.message);
    }
    setWordData({
      kanji: "",
      meaning: "",
      pronounce: "",
      example: "",
      image: "",
    });
  };

  const handleCancelSave = () => {
    //  set về mặc định
    setWordData({
      kanji: "",
      meaning: "",
      pronounce: "",
      image: "",
      example: "",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveWord();
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWordData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (user === null) return <RequireLoginInfo />;
  else if (user.role === 1) return <PageNotFound />;
  else
    return (
      <div className="page">
        <h2
          style={{
            margin: "0",
            padding: "0",
          }}
        >
          ADMIN: Create Word
        </h2>
        <div style={{ marginBottom: "20px" }}></div>

        <div className="row">
          <div className="word-data-form">
            Kanji:
            <input
              type="text"
              name="kanji"
              value={wordData.kanji}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            Meaning:
            <input
              type="text"
              name="meaning"
              value={wordData.meaning}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            Pronounce:
            <input
              type="text"
              name="pronounce"
              value={wordData.pronounce}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            Example:
            <input
              type="text"
              name="example"
              value={wordData.example}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div
            className="word-image-container"
            onClick={() => {
              handleAvtClick();
            }}
          >
            <img src={wordData.image || "/image/default_img.png"} />
            Tải ảnh lên
          </div>
        </div>
        <div className="word-preview">
          <h3>Preview:</h3>
          <ProgressWord word={wordData} />
        </div>
        <div className="submit-btn-container">
          <button
            style={{
              background: "red",
            }}
            onClick={handleCancelSave}
          >
            HỦY
          </button>
          <button
            onClick={handleSaveWord}
            style={{
              background: "green",
            }}
          >
            LƯU
          </button>
        </div>


        {
        showUploadImage ?
       (
  
  <div className='img-upload-pop-up-container'>
        <IoCloseOutline style={{cursor:"pointer",padding:"20px"}} onClick={handleCloseUploadImage} size={40}  />

  <ImageUploader display={handleCloseUploadImage} onImageUrlChange={setUploadedImageUrl} />
<div style={{width:'100%',display:'flex' ,gap:'40%', justifyContent:'center',}}>
  <button onClick={handleCancelUploadImgUrl} style={{width:'100px',height:'50px',borderRadius:'15px'}}>CANCEL</button>
  <button onClick={handleCloseUploadImage} style={{width:'100px',height:'50px',borderRadius:'15px'}}>SAVE</button>
  </div>
  </div>
)
  : null

}
      </div>
    );
};

export default CreateWordPage;
