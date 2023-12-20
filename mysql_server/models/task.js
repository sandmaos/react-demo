// models/task.js
const { DataTypes } = require('sequelize');
const myDB = require('../database');

const Task = myDB.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
