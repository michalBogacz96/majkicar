var Sequelize = require('sequelize');

const database = new Sequelize(null, null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: false
    }
});

module.exports = database;