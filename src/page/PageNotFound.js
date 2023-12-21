import React from "react";
import "../css/PageNotFound.css";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div className="page-not-found">
      <h2>404 - Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <p id="error-text">
        Xin lỗi! Trang bạn cần tìm không tồn tại hoặc đã bị xóa
      </p>
      <Link to={"/"}>
        {" "}
        <div id="comeBackHome">Quay về trang chủ</div>
      </Link>
    </div>
  );
}

export default PageNotFound;
