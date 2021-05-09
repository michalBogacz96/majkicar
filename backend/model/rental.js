var database = require('../config/database')
var Sequelize = require('sequelize');

let Rental = database.define('Rental', {

    rentalID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    carID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    brand: Sequelize.STRING,
    model: Sequelize.STRING,
    pathToPhoto: Sequelize.STRING,
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    rentalStartDate: Sequelize.DATEONLY,
    rentalFinishDate: Sequelize.DATEONLY
});

Rental.sync();
module.exports = Rental;