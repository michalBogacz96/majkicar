const config = require("./../config/config");
let jwt = require('jsonwebtoken');
let ResponseType1 = require("./ResponseType1");
const rentals = require('./../model/rental');


async function reservation(req, res, next) {


    let reservations1case = await rentals.findAndCountAll({where: {
            [Op.and]: [
                {
                    startDate: {
                        [Op.gt]: req.rentalStartDate,
                        [Op.lte]: req.rentalFinishDate
                    }
                },
                {
                    endDate: {
                        [Op.gt]: req.rentalFinishDate
                    }
                },
                {
                    carID: cars[i].carID
                }
            ]
        }});

    // Case which look like: * |  | *
    let reservations2case = await rentals.findAndCountAll({where: {
            [Op.and]: [
                {
                    startDate: {
                        [Op.gt]: req.rentalStartDate
                    }
                },
                {
                    endDate: {
                        [Op.lt]: req.rentalFinishDate
                    }
                },
                {
                    carID: cars[i].carID
                }
            ]
        }});

    // Case which look like:  | * | *
    let reservations3case = await rentals.findAndCountAll({where: {
            [Op.and]: [
                {
                    startDate: {
                        [Op.lt]: req.rentalStartDate
                    }
                },
                {
                    endDate: {
                        [Op.lt]: req.rentalFinishDate,
                        [Op.gt]: req.rentalStartDate,
                    }
                },
                {
                    carID: cars[i].carID
                }
            ]
        }});

    // Case which look like:  | * * |
    let reservations4case = await rentals.findAndCountAll({where: {
            [Op.and]: [
                {
                    startDate: {
                        [Op.lt]: req.rentalStartDate,
                        [Op.lt]: req.rentalFinishDate,
                    }
                },
                {
                    endDate: {
                        [Op.gt]: req.rentalFinishDate,
                        [Op.gt]: req.rentalStartDate,
                    }
                },
                {
                    carID: cars[i].carID
                }
            ]
        }});

    // Case which look like:  |  |
    //                        *
    let reservations5case = await rentals.findAndCountAll({where: {
            [Op.and]: [
                {
                    startDate: new Date(req.rentalFinishDate)
                },
                {
                    carID: cars[i].carID
                }
            ]
        }});

}

module.exports = reservation;