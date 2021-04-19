var database = require('./config/database');
var Sequelize = require('sequelize');

let Car = database.define('Car', {

    carID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: Sequelize.STRING,
    model: Sequelize.STRING,
    gearbox: Sequelize.STRING,
    amountOfDoors: Sequelize.INTEGER,
    amountOfBags: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    airConditioning: Sequelize.BOOLEAN
});

Car.sync({alter: true});

module.exports = Car;