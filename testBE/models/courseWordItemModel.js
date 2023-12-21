// Trong wordCourseItemModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbpostgres");

const WordCourseItem = sequelize.define(
  "course_word_item",
  {
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    underscored: true, // Thêm dòng này để bật chế độ underscored

    timestamps: false, // Tắt sử dụng "createdAt" và "updatedAt"
  },
);

module.exports = WordCourseItem;
