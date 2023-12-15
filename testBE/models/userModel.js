const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbpostgres');

const AppUser = sequelize.define('app_user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  age: {
    defaultValue :0,
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue:1,
    allowNull: false,
  },
  avt: {
    type: DataTypes.STRING,
    defaultValue: 'https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg',
  },
},
{tableName: 'app_user',
  timestamps: false,
});

module.exports = AppUser;
