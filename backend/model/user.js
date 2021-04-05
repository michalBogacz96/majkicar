var database = require('./config/database');
var Sequelize = require('sequelize');

let User = database.define('user', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    secondNameAuthor: Sequelize.STRING,
    dateOfBirth: Sequelize.DATE
});

module.exports = User;