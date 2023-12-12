// Server xài mongoDB

const express = require('express');
const cors = require('cors');
const db = require('./testBE/config/db');
const courseRoutes = require('./testBE/routes/courseRoutes');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use('/api', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
