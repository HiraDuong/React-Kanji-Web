const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Định nghĩa schema và model cho course
const courseSchema = new mongoose.Schema({
  // Định nghĩa cấu trúc của course ở đây
});

const Course = mongoose.model('Course', courseSchema);

// Middleware
app.use(express.json());
app.use(cors());

// Route để lấy tất cả các courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lắng nghe trên cổng
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
