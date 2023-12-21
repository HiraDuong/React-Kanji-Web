import React from "react";
import { useState } from "react";
import "./heading.css";
import SearchBar from "../searchbar";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";
import { Button } from "bootstrap";
//import SearchBar from './search';
function Heading() {
  const { user } = useUser();
  const logout = useUser();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleSearch = (searchTerm) => {
    // Xử lý tìm kiếm // gọi API các thứ
    console.log("Searching for:", searchTerm);
  };
  return (
    <div id="navBar-container">
      <div id="navBar">
        <Link to="/" className="navBarChild">
          <b className="card">KANJI CARD</b>
        </Link>
        {user ? (
          <div id="usernameWelcome">Xin chào {user?.name || []}</div>
        ) : null}

        {user ? (
          <button id="avt-container" onClick={toggleDropdown}>
            <img
              src={
                user?.avt ||
                "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
              }
              alt="User Avatar"
            />
          </button>
        ) : (
          <Link id="login-btn" to="/login">
            Đăng nhập
          </Link>
        )}
      </div>

      <div className="popup">
        {isDropdownVisible && (
          <div className="dropdown-content">
            {/* Nội dung của dropdown */}
            <>
              <span onClick={closeDropdown}>
                <Link to="/settings" className="navLink">
                  Cài đặt
                </Link>
              </span>
              <span
                className="navLink"
                onClick={() => {
                  closeDropdown();
                  logout.logout();
                }}
              >
                <Link to="/" className="navLink">
                  Đăng xuất
                </Link>
              </span>
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default Heading;
