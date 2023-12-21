const { generateToken, verifyToken } = require("../config/auth");
const AppUser = require("../models/userModel");

// ...

// Đăng nhập
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("User", { username, password });

    const user = await AppUser.findOne({ where: { username, password } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// logout

// logoutController.js

const logout = (req, res) => {
  // Xử lý hủy token hoặc các bước khác nếu cần
  // ...

  res.json({ message: "Logout successful" });
};

// Kiểm tra đăng nhập
const checkAuth = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid token" });
  }
  res.json({ user: decoded });
};

// ...
module.exports = {
  login,
  checkAuth,
  logout,
};
