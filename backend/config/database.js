var Sequelize = require('sequelize');

const database = new Sequelize('freedbtech_majkicar', 'freedbtech_michalbogacz', 'qwerty123', {
    host: 'freedb.tech',
    dialect: 'mysql',
});

module.exports = database;