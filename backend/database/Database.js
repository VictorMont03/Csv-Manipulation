const Sequelize = require('sequelize');
const configDatabase = require('../config/database');

const connection = new Sequelize(configDatabase);

module.exports = connection;