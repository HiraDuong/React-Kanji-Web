import "../css/UpdateCourse.css";

import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import "../css/CreateCourse.css";
import "../css/PageGlobal.css";
import PageNotFound from "./PageNotFound";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchWord from "../components/SearchWord/SearchWord";
import ProgressWord from "../components/progressWord/ProgressWord";
import { Colors } from "chart.js";
import APIpath from "../config/APIpath";
import ImageUploader from "../components/ImageUpLoad/ImageUpLoad";
import { IoCloseOutline } from "react-icons/io5";

const UpdateCoursePage = () => {
  const { user } = useUser();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  //    Lấy courseId
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const courseId = queryParams.get("courseId");

  // Lưu thông tin cơ bản về khóa học

  const [courseData, setCourseData] = useState([]);

  const [wordsCourseData, setWordsCourseData] = useState([]);

  const wordIds = wordsCourseData.map((word) => word.word_id);

  const [allWordFromCourse, setAllWordFromCourse] = useState([]);

  const navigate = useNavigate();

  //    Bước 1 : Lấy thông tin course và words từ 2 bảng course và course word item
  //    Bước 2 : Lưu thông tin đó vào courseData và wordCourseData
  //    Bước 3 : Gửi put request tới server
  // get course by courseId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIpath}courses/courseId/${courseId}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCourseData(data[0] || []);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [courseId]);
  //  course data trả về mảng dạng
  // [{…}]
  // 0
  // :
  // {course_id: 2, course_name: 'Kanji N2', description: 'Upper intermediate level Kanji', course_image: 'https://i.redd.it/v88lpnp2gok61.png', create_by: 'admin', …}
  // length
  // :
  // 1
  // [[Prototype]]
  // :
  // Array(0)

  //  get word by course id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIpath}/courses/getword/${courseId}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAllWordFromCourse(data || []);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [courseId]);

  useEffect(() => {
    if (allWordFromCourse && allWordFromCourse.words) {
      setWordsCourseData(allWordFromCourse.words);
    }
  }, [allWordFromCourse]);

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
    //  Đoạn này sẽ gọi API update khóa học
    //
    else
      try {
        const response = fetch(`${APIpath}/courses/courseId/${courseId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course_name: courseData.course_name,
            course_image: courseData.course_image,
            description: courseData.description,
            words: { array: wordIds },
          }),
        });
        if (response) {
          // Xử lý khi cập nhật thành công
          console.log("Course updated successfully");
          alert("Cập nhật khóa học thành công");
        } else {
          // Xử lý khi cập nhật thất bại
          console.error("Error updating course. Status:", response.status);
          alert("Cập nhật khóa học thất bại");
        }
      } catch (error) {
        console.error("Error updating course:", error);
        alert("Đã xảy ra lỗi, vui lòng thử lại");
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

  const handleDeleteCourse = async () => {
    //  Gọi API ở đây để xóa course by id
    // call API
    const userConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa khóa học không?",
    );

    if (userConfirmed) {
      try {
        const response = fetch(`${APIpath}courses/courseId/${courseId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response) {
          // Xử lý khi xóa thành công
          console.log("Course deleted successfully");
          alert("Xóa khóa học thành công");
          navigate("/coursePage");
        } else {
          // Xử lý khi xóa thất bại
          console.error("Error deleting course. Status:", response.status);
          alert("Xóa khóa học thất bại");
        }
        // Handle success as needed
      } catch (error) {
        console.error("Error delete remember status", error);
      }
    }
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
    <div className="row full-size">
      <div className="list-word">
        <p style={{ margin: "10px" }}>Danh sách từ:</p>
        {wordsCourseData.map((word, index) => (
          <span key={word.word_id}>
            {word.kanji} ,{index !== wordsCourseData.length - 1 ? <br /> : ""}
          </span>
        ))}
      </div>

      <div style={{ marginLeft: "120px" }} className="page">
        <h2>Chỉnh sửa khóa học</h2>
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
              src={courseData.course_image || "/image/default_img.png"}
            />
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
                CANCEL
              </button>
              <button
                onClick={handleCloseUploadImage}
                style={{ width: "100px", height: "50px", borderRadius: "15px" }}
              >
                SAVE
              </button>
            </div>
          </div>
        ) : null}

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
        </div>

        <div className="create-course-submit-btn-container">
          <button
            style={{ backgroundColor: "#f63b3b" }}
            onClick={handleDeleteCourse}
          >
            XÓA KHÓA HỌC
          </button>

          <button onClick={handleCancelSave}>HỦY BỎ</button>
          <button onClick={handleSaveInfo}>LƯU</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoursePage;
