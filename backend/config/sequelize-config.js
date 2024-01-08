const { Sequelize } = require('sequelize');
const { dbConfig } = require('./config.js');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres'
})

module.exports = sequelize