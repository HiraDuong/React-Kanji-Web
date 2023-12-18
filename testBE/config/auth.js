const jwt = require('jsonwebtoken');

// Secret key, bạn cần giữ nó an toàn và không chia sẻ với người khác
const secretKey = 'kanjiflashcard';

// Tạo token từ user object
const generateToken = (user) => {
  const token = jwt.sign({ userId: user.user_id,name:user.name ,username: user.username,avt :user.avt ,role: user.role}, secretKey, { expiresIn: '1h' });
  return token;
};

// Xác thực token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
