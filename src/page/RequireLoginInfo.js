import React from "react";
import { Link } from "react-router-dom";
import "../css/RequireLoginInfo.css";
const RequireLoginInfo = () => {
  return (
    <div>
      <h2>Yêu Cầu Đăng Nhập</h2>
      <p>Để xem thông tin này, bạn cần đăng nhập vào tài khoản của mình.</p>
      <Link to="/login">
        <button id="go-to-login-btn">Đăng Nhập</button>
      </Link>
    </div>
  );
};

export default RequireLoginInfo;
