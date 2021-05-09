var database = require('../config/database');
var Sequelize = require('sequelize');

let User = database.define('User', {

    userID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    secondName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    permissionType: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

User.sync()
module.exports = User;