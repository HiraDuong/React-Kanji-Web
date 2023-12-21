// RememberButton.js
import React from "react";
import "./Button.css";

const RememberButton = ({ color, text, onClick }) => {
  return (
    <div className="btn" style={{ background: color }} onClick={onClick}>
      {text}
    </div>
  );
};

export default RememberButton;
