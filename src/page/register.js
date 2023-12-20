import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

import '../css/PageGlobal.css';
import '../css/register.css';
import { Link ,useNavigate} from "react-router-dom";
import APIpath from "../config/APIpath";

const Register = () => {
  // get info from form 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const navigate = useNavigate()
  const handleRegister = async () => {
    // Kiểm tra xem password và rePassword có trùng khớp không
    if (password !== rePassword) {
      // Hiển thị thông báo lỗi
      setPasswordMismatch(true);
      return;
    }

    //  submit form
    const data = {
      name,
      username,
      email,
      password,
      rePassword,
    };

    // Log dữ liệu vào console để kiểm tra
    console.log("Submitted Data:", data);

    try {
        // Gọi API
        const response = await fetch(`${APIpath}users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },body: JSON.stringify(data),
    
        });
  
        // Chuyển đổi response thành JSON
        const result = await response.json();
        if(result.error){
            alert(result.error)
        }
        else 
        {   
            alert("Đăng ký thành công")
            navigate('/login')
        }
        // Log kết quả vào console để kiểm tra
        console.log("API Response:", result.error);
      } catch (error) {
        console.error("API Error:", error);
      }

  }


  
  return (
    <div className="row page">
      <div id="register-container">
     
          <h2>Đăng kí</h2>
          <form onSubmit={e => { e.preventDefault(); handleRegister(); }}>
            <div className="form-input">
              
              <label htmlFor="names">Họ tên</label>
              <input
                type="text"
                id="names"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="repassword">Nhập lại mật khẩu</label>
              <input
                type="password"
                id="rePassword"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
              {passwordMismatch && <p style={{ color: "red" }}>Mật khẩu không khớp</p>}
            </div>
            <button className="custom-button" type="submit">
              Đăng ký
            </button>
          </form>
            <p>
            Đã có tài khoản? <Link id="register" to="/login">Đăng nhập</Link>
          </p>
          <p>
            Hoặc đăng nhập bằng 
          </p>
          <div className="social-login">
            <button onClick={()=>{alert('Xin lỗi, chức năng đang được phát triển')}} className="facebook">
              <span> <FaFacebook /> Facebook</span>
            </button>
            <button onClick={()=>{alert('Xin lỗi, chức năng đang được phát triển')}} className="twitter">
              <span>
                <FaTwitter />
                Twitter
              </span>
            </button>
            <button onClick={()=>{alert('Xin lỗi, chức năng đang được phát triển')}} className="google">
              <span>
                <FaGoogle />
                Google
              </span>
            </button>
          </div>
      </div>
      <div className="register-background">
        <img
          id="register-img"
          src="image/register.png"
          alt="register Background"
        />
      </div>
    </div>  
  );
}

export default Register;
