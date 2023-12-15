// userProgress
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbpostgres'); // Đường dẫn có thể khác tùy vào cấu trúc thư mục của bạn

const UserProgress = sequelize.define('user_progress', {
  user_progress_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  word_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  remember: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{tableName: 'user_progress',
  timestamps: false,
});

// Define relationships with other tables if needed

module.exports = UserProgress;
