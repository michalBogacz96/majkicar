var database = require('./config/database');
var Sequelize = require('sequelize');

let Rental = database.define('Rental', {

    rentalID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    carID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Car',
            key: 'carID'
        }
    },
    userID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'User',
            key: 'userID'
        }
    },
    rentalStartDate: Sequelize.DATEONLY,
    rentalFinishDate: Sequelize.DATEONLY
});

Rental.sync({alter: true});
module.exports = Rental;