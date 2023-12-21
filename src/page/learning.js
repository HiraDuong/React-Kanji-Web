import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/PageGlobal.css";
import "../css/learning.css";
import CourseTitle from "../components/course/CourseTitle";
import RememberButton from "../components/course/Button";
import Card from "../components/card/card";
import Counter from "../components/course/counter";
import { useLocation } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useUser } from "../UserContext";
import RequireLoginInfo from "./RequireLoginInfo";
import APIpath from "../config/APIpath";
import { IoClose } from "react-icons/io5";
function Learning() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const courseId = queryParams.get("courseId");
  const { user } = useUser();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [forgot, setForgot] = useState([]);
  const [remember, setRemember] = useState([]);
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [cardAPIData, setCardAPIData] = useState([1]); // Thêm dòng này

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Thêm state để kiểm soát việc hiển thị nút
  const [isFinished, setIsFinished] = useState(false);
  const [isPopup, setIsPopup] = useState(true);

  const href = `/practice?courseId=${courseId}`;

  // call API
  // get course from course id

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/courses/courseId/${courseId}`,
          {
            timeout: 5000, // Thời gian chờ tối đa là 5 giây, bạn có thể điều chỉnh giá trị này
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data) {
          setCourse(data);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // get words from course
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/courses/getword/${courseId}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCardAPIData(data || []);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // word theo khóa học
  const { words } = cardAPIData;

  useEffect(() => {
    // console.log('Remember:', remember);
    // console.log('Forgot:', forgot);

    // Kiểm tra xem đã học hết chưa
    const totalLearnedWords = remember.length + forgot.length;
    setIsFinished(totalLearnedWords === words?.length ?? 5);
    if (totalLearnedWords === words?.length ?? 5) {
      console.log("Học hết rồi, hiển thị nút chuyển trang luyện tập");
      // Hiển thị nút chuyển trang luyện tập hoặc thực hiện hành động chuyển trang
    }
  }, [remember, forgot, words]);

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, words?.length - 1 ?? 4),
    );
  };

  const handlePrevCard = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRememberOrForgot = (isRemember) => {
    const currentCard = words[currentIndex];

    // Kiểm tra xem từ hiện tại đã có trong mảng remember hoặc forgot chưa
    const isAlreadyRemembered = remember.some(
      (item) => item.kanji === currentCard.kanji,
    );

    const isAlreadyForgotten = forgot.some(
      (item) => item.kanji === currentCard.kanji,
    );

    if (isRemember && !isAlreadyRemembered) {
      if (isAlreadyForgotten) {
        //  Xóa từ đó khỏi danh sách chưa nhớ
        setForgot((prevForgot) =>
          prevForgot.filter((item) => item.kanji !== currentCard.kanji),
        );
      }
      setRemember((prevRemember) => [...prevRemember, currentCard]);
    } else if (!isRemember && !isAlreadyForgotten) {
      if (isAlreadyRemembered) {
        // Xóa từ đó khỏi danh sách đã nhớ
        setRemember((prevRemember) =>
          prevRemember.filter((item) => item.kanji !== currentCard.kanji),
        );
      }
      setForgot((prevForgot) => [...prevForgot, currentCard]);
    }

    handleNextCard();
  };

  // cái Remember và Forgot bên backEnd

  console.log("Remember", remember);
  console.log("Forgot", forgot);

  let handleRemember = async () => {
    handleRememberOrForgot(true);
    // call API
    try {
      await fetch(
        `http://localhost:5000/api/userProgress/Remember/uc/${user.userId}/${courseId}/${words[currentIndex].word_id}/remember`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error));
      // Handle success as needed
    } catch (error) {
      console.error("Error updating remember status", error);
      // Handle error as needed
    }
  };

  let handleForgot = () => {
    handleRememberOrForgot(false);

    // call API
    try {
      fetch(
        `${APIpath}userProgress/Remember/uc/${user.userId}/${courseId}/${words[currentIndex].word_id}/not-remember`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
      // Handle success as needed
    } catch (error) {
      console.error("Error updating remember status", error);
      // Handle error as needed
    }
  };

  // Hàm xử lý khi chuyển tới trang luyện tập
  const handleGoToPractice = () => {
    // Thực hiện hành động chuyển trang hoặc hiển thị thông báo
    console.log("Chuyển tới trang luyện tập");
    navigate(href);
    // Ví dụ chuyển trang sử dụng hook useNavigate
  };
  if (user == null) {
    return <RequireLoginInfo />;
  } else if (courseId === null) {
    return <PageNotFound />;
  } else
    return (
      <div className="page">
        <CourseTitle title={course?.[0]?.course_name} />
        <Card word={words && words[currentIndex] ? words[currentIndex] : {}} />

        <div className="btn-container">
          <RememberButton
            color="rgb(162 155 155)"
            text="CHƯA NHỚ"
            onClick={handleForgot}
          />
          <RememberButton
            color="rgb(22 73 235)"
            text="ĐÃ NHỚ"
            onClick={handleRemember}
          />
        </div>
        <Counter
          num1={currentIndex + 1}
          num2={words?.length ?? 5}
          onDecrement={handlePrevCard}
          onIncrement={handleNextCard}
        />
        <div
          className={`go-to-practice ${
            isFinished && isPopup ? "visible congrats-animation" : "hidden"
          }`}
        >
          <div style={{ width: "100%", textAlign: "right" }}>
            <IoClose
              style={{
                cursor: "pointer",
              }}
              size={40}
              onClick={() => {
                setIsPopup(false);
              }}
            />
            <h3 style={{ textAlign: "center" }}>
              CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI HỌC
            </h3>
          </div>
          <Link className="nagivate-button" to={href}>
            Chuyển tới trang luyện tập
          </Link>
          HOẶC
          <Link className="nagivate-button" to={"/coursePage"}>
            Quay lại trang khóa học
          </Link>
          <img className="congrats-icon" src="/image/congrats_icon.png" />
        </div>
      </div>
    );
}

export default Learning;
