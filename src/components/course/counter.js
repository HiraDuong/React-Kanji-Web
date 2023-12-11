import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import './counter.css';

const Counter = ({ num1, num2, onDecrement, onIncrement }) => {
  return (
    <div className="counter-container">
      <div className='arr-left' onClick={onDecrement}><FaArrowLeft /></div>
      <div className="counter-text">{num1}/{num2}</div>
      <div className='arr-right' onClick={onIncrement}><FaArrowRight /></div>
    </div>
  );
}

export default Counter;
