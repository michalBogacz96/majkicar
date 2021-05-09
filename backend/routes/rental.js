var express = require('express');
var router = express.Router();
const rentals = require('./../model/rental');
const cars = require('./../model/car');
let UserPermission = require('../utils/UserPermission')
let ResponseType1 = require('../utils/ResponseType1');
const {Op} = require("sequelize");


router.get('/bookings', UserPermission, async function (req, res, next) {

        rentals.findAll({
            where: {
                userID: req.token.userID
            }
        }).then(
            result => {
                res.send(new ResponseType1(true, result));
            }
        ).catch(
            err => {
                res.send(new ResponseType1(false, "Something go wrong"));
                console.log(err);
            }
        );
    }
);

router.post('/', UserPermission, async function (req, res, next) {

        const carID = req.body.carID;
        const brand = req.body.brand;
        const model = req.body.model;
        const pathToPhoto = req.body.pathToPhoto;
        const userID = req.token.userID;
        const rentalStartDate = req.body.rentalStartDate;
        const rentalFinishDate = req.body.rentalFinishDate;


        const rental = {
            carID: carID,
            userID: userID,
            brand: brand,
            model: model,
            pathToPhoto: pathToPhoto,
            rentalStartDate: rentalStartDate,
            rentalFinishDate: rentalFinishDate
        }

        if (rentalStartDate == null && rentalFinishDate == null) {
            res.send(new ResponseType1(false, "You have to check dates."));
            return;
        } else if (rentalStartDate == null) {
            res.send(new ResponseType1(false, "You have to check start date."));
            return;
        } else if (rentalFinishDate == null) {
            res.send(new ResponseType1(false, "You have to check end date."));
            return;
        }

        rentals.create(rental).then(result => {
            res.send(new ResponseType1(true, result))
        }).catch(
            err => {
                res.send(new ResponseType1(false, "Something go wrong"));
                console.log(err);
                return;
            }
        );
    }
)
;

router.put('/', UserPermission, function (req, res, next) {

        const rentalID = req.body.rentalID;
        const carID = req.body.carID;
        const userID = req.token.userID;
        const brand = req.body.brand;
        const model = req.body.model;
        const rentalStartDate = req.body.rentalStartDate;
        const rentalFinishDate = req.body.rentalFinishDate;


        const rental = {
            rentalID: rentalID,
            carID: carID,
            userID: userID,
            brand: brand,
            model: model,
            rentalStartDate: rentalStartDate,
            rentalFinishDate: rentalFinishDate
        }




        if (rentalStartDate == null && rentalFinishDate == null) {
            res.send(new ResponseType1(false, "You have to check dates."));
            return;
        } else if (rentalStartDate == null) {
            res.send(new ResponseType1(false, "You have to check start date."));
            return;
        } else if (rentalFinishDate == null) {
            res.send(new ResponseType1(false, "You have to check end date."));
            return;
        }


        rentals.findOne({
            where: {
                rentalID: rentalID
            }
        }).then(
            result => {
                if (!result) {
                    res.send(new ResponseType1(false, "User with this userID does not exist"));
                    return;
                }

                rentals.update(rental, {
                        where: {
                            rentalID: rentalID
                        }
                    }
                ).then(
                    result => {
                        console.log("Result");
                        console.log(result);
                        res.send(new ResponseType1(true, "Record successfully changed"));
                    }
                ).catch(
                    err => {
                        console.log(err);
                        res.send(new ResponseType1(false, "Something gone wrong ;("));
                    }
                );

            }
        ).catch(
            err => {
                res.send(new ResponseType1(false, "Something gone wrong ;("));
                console.log(err);
                return;
            }
        );

    }
);

router.delete('/:rentalID', function (req, res, next) {

        const rentalID = req.params.rentalID;

        rentals.destroy({
            where: {
                rentalID: rentalID
            }
        }).then(
            response => {
                res.send(new ResponseType1(true, "Record successfully deleted"));
            }
        );
    }
);


module.exports = router;