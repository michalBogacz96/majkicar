var express = require('express');
var router = express.Router();
var moment = require('moment');
var emailValidator = require('email-validator');
const users = require('./../model/user');

router.get('/', async function (req, res, next) {

        let response = await users.findAll();
        res.send(response);
    }
);

router.post('/', async function (req, res, next) {

        const firstName = req.body.firstName;
        const secondName = req.body.secondName;
        const dateOfBirth = req.body.dateOfBirth;
        const email = req.body.email;
        const password = req.body.password;

        if (!moment(dateOfBirth).isValid()) {
            res.send("Date is incorrect");
        }

        if (emailValidator.validate(email)) {
            const user = {
                firstName: firstName,
                secondName: secondName,
                dateOfBirth: dateOfBirth,
                email: email,
                password: password,
                roleID: 1
            }

            users.create(user).then(result => res.send(result));

        } else {
            res.send("Email is not correct");
        }
    }
);


router.put('/', async function (req, res, next) {

        const userID = req.body.userID;
        const firstName = req.body.firstName;
        const secondName = req.body.secondName;
        const dateOfBirth = req.body.dateOfBirth;
        const email = req.body.email;
        const password = req.body.password;
        const roleID = req.body.roleID;

        if (!moment(dateOfBirth).isValid()) {
            res.send("Date is incorrect");
        }

        if (emailValidator.validate(email)) {
            const user = {
                firstName: firstName,
                secondName: secondName,
                dateOfBirth: dateOfBirth,
                email: email,
                password: password,
                roleID: roleID
            }

            users.update(user, {
                where: {
                    userID: userID
                }
            }).then(
                result => res.send(result)
            );

        } else {
            res.send("Email is not correct");
        }
    }
);


router.delete('/:userID', async function (req, res, next) {

        const userID = req.params.userID;

        users.destroy({
            where: {
                userID: userID
            }
        }).then(
            response => {
                res.send(response.toString())
            }
        );
    }
);

router.get('/sortByNameAsc', async function (req, res, next) {

    let response = await users.findAll({
        order: [
            ['secondName', 'ASC']
        ]
    });
    res.send(response);

});

router.get('/sortByNameDesc', async function(req, res, next) {

    let response = await users.findAll({
        order: [
            ['secondName', 'DESC']
        ]
    });
    res.send(response);

});

router.get('/sortByEmailAsc', async function (req, res, next) {

    let response = await users.findAll({
        order: [
            ['email', 'ASC']
        ]
    });
    res.send(response);

});

router.get('/sortByEmailDesc', async function(req, res, next) {

    let response = await users.findAll({
        order: [
            ['email', 'DESC']
        ]
    });
    res.send(response);

});

router.get('/byRoleID/:roleID', (req, res, next) => {

    const roleID = req.params.movieID;

    users.findAll({
        where: {
            roleID: roleID
        }
    }).then(
        result => res.send(result)
    );
});

module.exports = router;