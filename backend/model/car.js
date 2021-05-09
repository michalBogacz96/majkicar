var database = require('../config/database');
var Sequelize = require('sequelize');

let Car = database.define('Car', {

    carID: {
        allowNull: false,
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
    airConditioning: Sequelize.BOOLEAN,
    pathToPhoto: Sequelize.STRING
});

Car.sync();

module.exports = Car;