const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbpostgres');

const CourseModel = sequelize.define('course', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  course_image: {
    type: DataTypes.STRING,
  },
}
,
{
    timestamps: false, // Tắt sử dụng "createdAt" và "updatedAt"
  });

module.exports = CourseModel;
