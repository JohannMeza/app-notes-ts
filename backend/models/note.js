const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const User = require('./User');
const Categorie = require('./Categorie');

const Note = sequelize.define('note', {
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  color: {
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
  categorieId: {
    type: DataTypes.INTEGER, // Cambia esto al tipo de dato del ID del usuario
    allowNull: true,
    references: {
      model: Categorie, // Modelo al que se hace referencia
      key: 'id' // Columna del modelo al que se hace referencia
    }
  }
});

(async () => await sequelize.sync())();

module.exports = Note;