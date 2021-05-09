var express = require('express');
var router = express.Router();
const cars = require('./../model/car');
let UserPermission = require('../utils/UserPermission')
let ResponseType1 = require('./../utils/ResponseType1')



router.get('/', UserPermission,  function (req, res, next) {


    cars.findAll().then(
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

router.get('/bookings', UserPermission,  function (req, res, next) {


        cars.findAll().then(
            result => {
                res.send(result);
            }
        ).catch(
            err => {
                res.send("result");
                console.log(err);
            }
        );

    }
);


router.post('/', function (req, res, next) {

        const brand = req.body.brand;
        const model = req.body.model;
        const amountOfDoors = req.body.amountOfDoors;
        const amountOfBags = req.body.amountOfBags;
        const price = req.body.price;
        const airConditioning = req.body.airConditioning;
        const image = req.body.image;


        const car = {
            brand: brand,
            model: model,
            amountOfDoors: amountOfDoors,
            amountOfBags: amountOfBags,
            price: price,
            airConditioning: airConditioning,
            image: image
        }

        cars.create(car).then(result => res.send(result));
    }
);

router.put('/', function (req, res, next) {

        const carID = req.body.carID;
        const brand = req.body.brand;
        const model = req.body.model;
        const amountOfDoors = req.body.amountOfDoors;
        const amountOfBags = req.body.amountOfBags;
        const price = req.body.price;
        const airConditioning = req.body.airConditioning;


        const car = {
            brand: brand,
            model: model,
            amountOfDoors: amountOfDoors,
            amountOfBags: amountOfBags,
            price: price,
            airConditioning: airConditioning
        }

        cars.update(car, {
            where: {
                carID: carID
            }
        }).then(
            result => res.send(result)
        );
    }
);

router.delete('/:carID', function (req, res, next) {

        const carID = req.params.carID;

        cars.destroy({
            where: {
                carID: carID
            }
        }).then(
            response => {
                res.send(response.toString())
            }
        );
    }
);

router.get('/sortByBrandAsc', async function (req, res, next) {

    let response = await cars.findAll({
        order: [
            ['brand', 'ASC']
        ]
    });
    res.send(response);

});

router.get('/sortByBrandDesc', async function (req, res, next) {

    let response = await cars.findAll({
        order: [
            ['brand', 'DESC']
        ]
    });
    res.send(response);

});

router.get('/sortByModelAsc', async function (req, res, next) {

    let response = await cars.findAll({
        order: [
            ['model', 'ASC']
        ]
    });
    res.send(response);

});

router.get('/sortByModelDesc', async function (req, res, next) {

    let response = await cars.findAll({
        order: [
            ['model', 'DESC']
        ]
    });
    res.send(response);

});


router.get('/sortByPriceAsc', async function (req, res, next) {

    let response = await cars.findAll({
        order: [
            ['price', 'ASC']
        ]
    });
    res.send(response);

});

router.get('/sortByPriceDesc', async function (req, res, next) {

    let response = await cars.findAll({
        order: [
            ['price', 'DESC']
        ]
    });
    res.send(response);

});

router.get('/sortByGearboxAsc', async function (req, res, next) {

    let response = await cars.findAll({
        order: [
            ['gearbox', 'ASC']
        ]
    });
    res.send(response);

});

router.get('/sortByGearboxDesc', async function (req, res, next) {

    let response = await cars.findAll({
        order: [
            ['gearbox', 'DESC']
        ]
    });
    res.send(response);

});

module.exports = router;