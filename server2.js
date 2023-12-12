const express = require('express');
const { Pool } = require('pg');
const config = require('./testBE/config/postgres'); // Đường dẫn có thể khác tùy vào cấu trúc thư mục của bạn
const wordRoutes = require('./testBE/routes/wordRoutes');
const courseRoutes = require('./testBE/routes/courseRoutes');
const wordCourseItemRoutes = require('./testBE/routes/wordCourseItemRoutes');
const app = express();
const PORT = config.server.port;

const pool = new Pool(config.database);
// route
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');

    const result = await client.query('SELECT $1::text as message', ['Hello, this is your API!']);
    const message = result.rows[0].message;

    res.send(message);

    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL', error);
    res.status(500).send('Internal Server Error');
  }
});


const cors = require('cors');


app.use(cors());
app.use('/api',wordRoutes);
app.use('/api', wordCourseItemRoutes);
app.use('/api', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});