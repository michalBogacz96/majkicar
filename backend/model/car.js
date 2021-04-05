var database = require('./config/database');
var Sequelize = require('sequelize');

let Car = database.define('car', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: Sequelize.STRING,
    model: Sequelize.STRING,
    amountOfDoors: Sequelize.INTEGER,
    amountOfBags: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    airConditioning: Sequelize.BOOLEAN
});

module.exports = Car;