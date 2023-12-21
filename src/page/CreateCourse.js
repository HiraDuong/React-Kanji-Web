import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import "../css/CreateCourse.css";
import "../css/PageGlobal.css";
import PageNotFound from "./PageNotFound";
import { Link, useNavigate } from "react-router-dom";
import SearchWord from "../components/SearchWord/SearchWord";
import ProgressWord from "../components/progressWord/ProgressWord";
import { Colors } from "chart.js";
import APIpath from "../config/APIpath";
import ImageUploader from "../components/ImageUpLoad/ImageUpLoad";
import { IoCloseOutline } from "react-icons/io5";

const CreateCoursePage = () => {
  const { user } = useUser();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const navigate = useNavigate();
  // Lưu thông tin cơ bản về khóa học
  const [courseData, setCourseData] = useState({
    create_by: user.role === 1 ? user.name : undefined,
    created_by_user_id: user.userId,
    course_name: "",
    description: "",
    course_image: uploadedImageUrl,
  });
  // Lưu thông tin về các words trong khóa học
  // (mảng này chỉ chứa id word)

  const [wordsCourseData, setWordsCourseData] = useState([]);
  const wordIds = wordsCourseData.map((word) => word.word_id);

  useEffect(() => {
    // Mỗi khi uploadedImageUrl thay đổi, cập nhật giá trị trong courseData
    setCourseData((prevData) => ({
      ...prevData,
      course_image: uploadedImageUrl,
    }));
  }, [uploadedImageUrl]);
  const handleAddWord = (word) => {
    // Kiểm tra xem từ đã có trong mảng chưa
    const isWordAlreadyAdded = wordsCourseData.some(
      (w) => w.word_id === word.word_id,
    );

    // Nếu chưa có, thêm vào mảng
    if (!isWordAlreadyAdded) {
      setWordsCourseData((prevData) => [...prevData, word]);
    } else {
      // Thực hiện một hành động khác (hiển thị thông báo, chẳng hạn)
    }
  };

  const handleRemoveWord = (wordId) => {
    setWordsCourseData((prevData) =>
      prevData.filter((w) => w.word_id !== wordId),
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveInfo = async () => {
    if (wordIds.length < 5) alert("Vui lòng tạo khóa học có 5 từ trở lên! ");
    //  Đoạn này sẽ gọi API
    //  Đầu tiên là API tạo khóa học : bảng course
    else
      try {
        const response = await fetch(`${APIpath}courses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course_name: courseData.course_name,
            description: courseData.description,
            course_image: courseData.course_image,
            create_by: courseData.create_by,
            created_by_user_id: courseData.created_by_user_id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();

          if (errorData.error == "SequelizeUniqueConstraintError")
            alert("Bạn đã dùng tên khóa học này rồi\n Vui lòng dùng tên khác");
          else alert(`Error creating course: ${errorData.error}`);

          throw new Error(`Error creating course: ${errorData.error}`);
        }

        const responseData = await response.json();
        console.log(
          "Course created successfully. Course ID:",
          responseData.course_id,
        );
        // Tiếp theo là API add word vào course : bảng course word item
        try {
          const response = await fetch(
            `${APIpath}create-courses/${responseData.course_id}/add-words`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                course_id: responseData.course_id,
                word_ids: wordIds,
              }),
            },
          );
          if (!response.ok) {
            const errorMessage = await response.text();
            console.error(`Error: ${errorMessage}`);
            return;
          }

          const result = await response.json();
          console.log(result);
          alert(`Tạo khóa học thành công`);
          navigate(`/courseProgress?courseId=${responseData.course_id}`);
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error.message);
      }
  };
  const handleCancelSave = () => {
    //  set về mặc định
    setCourseData({
      create_by: user.name,
      course_name: "",
      description: "",
      course_image: uploadedImageUrl,
      created_by_user_id: user.userId,
    });
    setWordsCourseData([0]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveInfo();
    }
  };

  // Phần xử lý add word vào course
  const [searchResults, setSearchResults] = useState([]);

  // Hàm này sẽ nhận dữ liệu từ SearchWords và cập nhật kết quả tìm kiếm
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

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

  // Tạm thời cho phép tất cả user quyền tạo khóa học
  if (user === null) return <PageNotFound />;

  return (
    <div className=" row full-size">
      <div className={`list-word ${showUploadImage ? "blur-background" : ""}`}>
        <p style={{ margin: "10px" }}>Danh sách từ:</p>

        {wordsCourseData.map((word, index) => (
          <span key={word.word_id}>
            {word.kanji} ,{index !== wordsCourseData.length - 1 ? <br /> : ""}
          </span>
        ))}
      </div>

      <div
        style={{ marginLeft: "120px" }}
        className={`page ${showUploadImage ? "blur-background" : ""}`}
      >
        <h2>Tạo khóa học</h2>
        <div className="row">
          <div className="create-course-header">
            Tên khóa học
            <input
              type="text"
              name="course_name"
              value={courseData.course_name}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            Mô tả
            <input
              type="text"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div>
            <img
              className="create-course-img"
              onClick={() => {
                handleAvtClick();
              }}
              src={uploadedImageUrl || "/image/default_img.png"}
            />
            <Link className="create-word-btn" to={"/admin/create-word"}>
              THÊM THẺ MỚI
            </Link>
          </div>
        </div>

        <SearchWord onSearchResults={handleSearchResults} />

        <div className="word-search-results">
          {searchResults.map((word) => (
            <div key={word.word_id} className="create-course-words-list">
              <ProgressWord word={word} />
              <div className="col ">
                <button
                  onClick={() => handleAddWord(word)}
                  style={{ backgroundColor: "#42eb11", color: "white" }}
                >
                  THÊM
                </button>
                <button
                  onClick={() => handleRemoveWord(word.word_id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  XÓA
                </button>
              </div>
            </div>
          ))}
          ta
        </div>

        <div className="create-course-submit-btn-container">
          <button onClick={handleCancelSave}>HỦY BỎ</button>
          <button onClick={handleSaveInfo}>TẠO KHÓA HỌC</button>
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

export default CreateCoursePage;
