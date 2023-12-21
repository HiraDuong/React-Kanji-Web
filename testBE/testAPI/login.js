// Thay đổi thông tin đăng nhập tại đây
const loginData = {
  username: "john_doe",
  password: "password123",
};

// Địa chỉ API của bạn
const apiUrl = "http://localhost:5000/api/auth/login";

// Gửi yêu cầu POST đến API login
fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(loginData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Login Response:", data);

    // Kiểm tra xác thực sau khi login
    if (data.token) {
      const checkAuthUrl = "http://localhost:5000/api/auth/check-auth";

      // Gửi yêu cầu GET đến API checkAuth với token
      return fetch(checkAuthUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${data.token}`,
        },
      });
    } else {
      console.error("Login failed.");
      return Promise.reject("Login failed.");
    }
  })
  .then((response) => response.json())

  .then((data) => {
    console.log("CheckAuth Response:", data.user);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
