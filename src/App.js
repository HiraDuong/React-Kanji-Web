import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Heading from './components/heading/index.js';
import Nav from './components/nav/index.js';
import HomePage from './page/homePage';
import CoursePage from './page/coursePage';
import CourseProgress from './page/courseProgressPage';
import Learning from './page/learning';
import Practice from './page/practice';
import KanjiLevelLearning from './page/KanjiLevelLearning.js';

function App() {
  return (
    <div className="App">
   
      <div className='header-container'>
      <Heading />
      </div>
      
      <div className='body-page'>
    
        <Nav/>
   
      <div className='child-page'>

      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/coursePage" element={<CoursePage/>} />

        {/* route for progress */}
        <Route path="/courseProgress" element={<CourseProgress/>} >
        <Route path=":level" element={<CourseProgress/>} />
        </Route>


        <Route path="/learning" element={<KanjiLevelLearning />}>
        {/* Thêm Route con cho các cấp độ kanji */}
      <Route path=":level" element={<KanjiLevelLearning/>} />
  </Route>
  {/* route for practice */}
        <Route path="/practice" element={<Practice/>} >
        <Route path=":level" element={<Practice/>} />
        </Route>
      </Routes>
      </div>

      </div>

    </div>
  );
}

export default App;
