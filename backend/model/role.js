var database = require('./config/database');
var Sequelize = require('sequelize');

let Role = database.define('role', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: Sequelize.STRING
});

module.exports = Role;