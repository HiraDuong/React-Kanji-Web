import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { useUser } from '../UserContext';
import '../css/login.css';
import '../css/PageGlobal.css';
import APIpath from "../config/APIpath";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useUser()
  

  const handleLogin = async () => {
    try {
      // Thông tin đăng nhập từ state của component
      const loginData = {
        username,
        password,
      };

      // API

       // Địa chỉ API 
  const apiUrl = `${APIpath}/auth/login`;
  
  // Gửi yêu cầu POST đến API login
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Login Response:', data);
  
      // Kiểm tra xác thực sau khi login
      if (data.token) {
        const checkAuthUrl = `${APIpath}/auth/check-auth`;
        
        // Gửi yêu cầu GET đến API checkAuth với token
        return fetch(checkAuthUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${data.token}`,
          },
        });
      } else {
        console.error('Login failed.');
        alert("Sai tài khoản hoặc mật khẩu !")
        return Promise.reject('Login failed.');
      }
    })
    .then(response => response.json())
    
    .then(data => {
      console.log('CheckAuth Response:', data);
      console.log('Login Susscessfully',data.user);
      // saveUserToCookie(data);
      login.login(data.user)
      navigate('/')
    })
    .catch(error => {
      console.error('Error:', error.message);
    });


    }
    catch (error) {
      console.error('Error:', error.message);
    }
  }  
  

  return (
    <div className="row page">
      <div className="page">
        <div>
          <h1>Đăng nhập</h1>
          <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
            <div>
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="custom-button" type="submit">
              Đăng nhập
            </button>
          </form>
          <p>
            Chưa có tài khoản? <Link id="register" to="/register">Đăng ký</Link>
          </p>
          <p>Hoặc đăng nhập bằng</p>
          <div className="social-login">
            <button onClick={()=>{alert('Xin lỗi, tính năng đang được phát triển !')}} className="facebook">
               <FaFacebook /> Facebook
            </button>
            <button onClick={()=>{alert('Xin lỗi, tính năng đang được phát triển !')}} className="twitter">
              
                <FaTwitter />Twitter
            </button>
            <button onClick={()=>{alert('Xin lỗi, tính năng đang được phát triển !')}} className="google">
              
                <FaGoogle />Google
            </button>
          </div>
        </div>
      </div>
      <div className="login-background">
        <img src="image/login.png" alt="Login Background" />
      </div>
    </div>  
  );
}

export default Login;
