// database.js
const { Sequelize } = require('sequelize');

const myDB = new Sequelize('demo', 'root', '0000', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = myDB;
