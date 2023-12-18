const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./testBE/config/postgres');
const wordRoutes = require('./testBE/routes/wordRoutes');
const courseRoutes = require('./testBE/routes/courseRoutes');
const wordCourseItemRoutes = require('./testBE/routes/wordCourseItemRoutes');
const userRoutes = require('./testBE/routes/userRoutes');
const authRoutes = require('./testBE/routes/authRoutes');
const userProgressRoutes = require('./testBE/routes/userProgressRoutes');

const app = express();
const PORT = config.server.port;

// Your existing routes
app.get('/', (req, res) => {
  res.send('Hello from your API!');
});

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/api', [
  wordRoutes,
  wordCourseItemRoutes,
  courseRoutes,
  userRoutes,
  authRoutes,
  userProgressRoutes,
]);

// // Proxy configuration for Imgur
// app.use('/imgur', createProxyMiddleware({
//   target: 'https://api.imgur.com',
//   changeOrigin: true,
//   headers: {
//     'Authorization': 'Client-ID d19c7f7884b4f86', // Thay YOUR_CLIENT_ID bằng client ID của bạn từ Imgur
//   },
// }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
