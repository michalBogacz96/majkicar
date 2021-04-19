var express = require('express');
var router = express.Router();
const rentals = require('./../model/rental');

router.get('/', async function (req, res, next) {

        let response = rentals.findAll();
        res.send(response);
    }
);

router.post('/', async function (req, res, next) {

        const carID = req.body.carID;
        const userID = req.body.userID;
        const rentalStartDate = req.body.rentalStartDate;
        const rentalFinishDate = req.body.rentalFinishDate;



        const rental = {
            carID: carID,
            userID: userID,
            rentalStartDate: rentalStartDate,
            rentalFinishDate: rentalFinishDate
        }

        rentals.create(rental).then(result => res.send(result));
    }
);

router.put('/', async function (req, res, next) {

    const rentalID = req.body.rentalID;
    const carID = req.body.carID;
    const userID = req.body.userID;
    const rentalStartDate = req.body.rentalStartDate;
    const rentalFinishDate = req.body.rentalFinishDate;



    const rental = {
        carID: carID,
        userID: userID,
        rentalStartDate: rentalStartDate,
        rentalFinishDate: rentalFinishDate
    }

        rentals.update(rental, {
            where: {
                rentalID: rentalID
            }
        }).then(
            result => res.send(result)
        );
    }
);

router.delete('/:rentalID', async function (req, res, next) {

        const rentalID = req.params.rentalID;

        rentals.destroy({
            where: {
                rentalID: rentalID
            }
        }).then(
            response => {
                res.send(response.toString())
            }
        );
    }
);

module.exports = router;