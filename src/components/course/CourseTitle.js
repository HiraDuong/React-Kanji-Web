// CourseTitle.js
import React from 'react';
import './title.css'
const CourseTitle = ({title}) => {
  return (
    <div className = 'title'
    style={{ color: '#3B82F6', fontSize: 44, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>{title}</div>
  );
};

export default CourseTitle;
