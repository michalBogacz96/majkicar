var database = require('./config/database');
var Sequelize = require('sequelize');

let User = database.define('User', {

    userID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    secondName: Sequelize.STRING,
    dateOfBirth: Sequelize.DATE,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    roleID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Role',
            key: 'roleID'
        }
    }
});

User.sync({alter: true})
module.exports = User;