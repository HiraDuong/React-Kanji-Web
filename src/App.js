import React from "react";
import { useLocation } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Heading from "./components/heading/index.js";
import Nav from "./components/nav/index.js";
import HomePage from "./page/homePage";
import CoursePage from "./page/coursePage";
import CourseProgress from "./page/courseProgressPage";
import Learning from "./page/learning";
import Practice from "./page/practice";
import TestAPI from "./page/testAPI.js";
import Learn from "./page/testQueryPram.js";
import PageNotFound from "./page/PageNotFound.js";
import Login from "./page/login.js";
import Register from "./page/register.js";
import { useUser } from './UserContext.js';
import Footer from "./components/footer/Footer.js";
import Settings from "./page/Settings.js";

function App() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const courseId = queryParams.get("courseId");
  
  const { user } = useUser();
  
  const bodyPageStyle = {
    top: user === null ? '60px ' : '120px ',
  };


  return (
    <div className="App">
      <div className="header-container">
        <Heading />
      </div>
      <div id="appNavBar">
      <Nav />
      </div>
      <div id="body-page"  style={bodyPageStyle}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coursePage" element={<CoursePage />} />

          {/* route for progress */}
          <Route path="/courseProgress" element={<CourseProgress />} />
          {/* learning */}
          <Route path="/learning" element={<Learning />} />


          {/* route for practice */}
          <Route path="/practice" element={<Practice />} />
          {/* Login- register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Setting */}
          <Route path="/settings" element={<Settings />} />



          {/* route for test API */}
          <Route path="/testAPI" element={<TestAPI />}>
            <Route path=":level" element={<TestAPI />} />
          </Route>
          <Route path="/test" element={<Learn />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer/>
      
      </div>


    </div>
  );
}

export default App;
