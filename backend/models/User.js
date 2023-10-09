const Sequelize = require('sequelize');
const connection = require('../database/Database');

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
    },
    favorite_sport: {
        type: Sequelize.STRING,
    },
})

User.sync({ force: false });

module.exports = User;