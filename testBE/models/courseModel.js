const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbpostgres");

const CourseModel = sequelize.define(
  "course",
  {
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
    create_by: {
      type: DataTypes.STRING, // Kiểu dữ liệu string
      defaultValue: "admin", // Giá trị mặc định là 'admin'
    },
    created_by_user_id: {
      type: DataTypes.INTEGER, // Kiểu dữ liệu string
      defaultValue: 2, // Giá trị mặc định là 'admin'
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CourseModel;
