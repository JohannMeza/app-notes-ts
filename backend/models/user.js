const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => await sequelize.sync())();

module.exports = User;