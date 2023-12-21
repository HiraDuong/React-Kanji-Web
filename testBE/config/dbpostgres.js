// dbpostgres.js
const { Sequelize } = require("sequelize");
const config = require("./postgres"); // Đường dẫn có thể khác tùy vào cấu trúc thư mục của bạn

const sequelize = new Sequelize(
  config.database.database,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: "postgres", // Cung cấp loại cơ sở dữ liệu ở đây
  },
);

module.exports = sequelize;
