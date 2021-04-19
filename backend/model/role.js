var database = require('./config/database');
var Sequelize = require('sequelize');

let Role = database.define('Role', {

    roleID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: Sequelize.STRING
});

Role.sync({alter: true})
module.exports = Role;