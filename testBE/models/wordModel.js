// wordModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbpostgres"); // Đường dẫn có thể khác tùy vào cấu trúc thư mục của bạn

const Word = sequelize.define(
  "word",
  {
    word_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    kanji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pronounce: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    example: {
      type: DataTypes.STRING,
      defaultValue: sequelize.literal(`'example for ' || "kanji"`), // Đặt giá trị mặc định là 'example for ' + giá trị của cột "kanji"
    },
  },
  {
    timestamps: false, // Tắt sử dụng "createdAt" và "updatedAt"
  },
);

module.exports = Word;
