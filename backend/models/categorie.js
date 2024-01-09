const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const User = require('./User');

const Categorie = sequelize.define('categorie', {
  categorie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
});

(async () => await sequelize.sync())();

module.exports = Categorie;