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
        `Tạo từ mới thành công: ${wordData.kanji}, ${wordData.meaning} , ${wordData.pronounce}`,
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
        <div style={{ marginBottom: "20px" }}></div>

        <div className={`row ${showUploadImage ? "blur-background" : ""}`}>
          <div className="word-data-form">
            <p>Kanji:</p>
            <input
              type="text"
              name="kanji"
              value={wordData.kanji}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <p>Nghĩa:</p>
            <input
              type="text"
              name="meaning"
              value={wordData.meaning}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <p>Phát âm:</p>
            <input
              type="text"
              name="pronounce"
              value={wordData.pronounce}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <p>Ví dụ:</p>
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
            <p>Tải ảnh lên</p>
          </div>
        </div>
        <div
          className={`word-preview ${showUploadImage ? "blur-background" : ""}`}
        >
          <h3>Xem trước:</h3>
          <ProgressWord word={wordData} />
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
        </div>

        {showUploadImage ? (
          <div className="img-upload-pop-up-container">
            <IoCloseOutline
              style={{ cursor: "pointer", padding: "20px" }}
              onClick={handleCloseUploadImage}
              size={40}
            />

            <ImageUploader
              display={handleCloseUploadImage}
              onImageUrlChange={setUploadedImageUrl}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "40%",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleCancelUploadImgUrl}
                style={{ width: "100px", height: "50px", borderRadius: "15px" }}
              >
                HỦY
              </button>
              <button
                onClick={handleCloseUploadImage}
                style={{ width: "100px", height: "50px", borderRadius: "15px" }}
              >
                LƯU
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
};

export default CreateWordPage;
