import React from "react";
import "./Footer.css"; // Đảm bảo import file CSS cho phong cách
import { FaFacebook, FaGithub } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  return (
    <footer className="footer-container">
      <h2>&copy; 2023 Kanji Flash</h2>
      <h2>Developed by Hira</h2>
      <br />
      <a href="https://github.com/HiraDuong" className="footer-icon">
        <FaGithub size={50} />
      </a>
      <a
        href="https://www.facebook.com/vuhuyhoanghirakuminamoto/"
        className="footer-icon"
      >
        <FaFacebook size={50} />
      </a>
      <a href="#" className="footer-icon">
        <CgMail size={50} />
      </a>
    </footer>
  );
};

export default Footer;
