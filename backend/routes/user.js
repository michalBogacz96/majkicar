let express = require('express');
let router = express.Router();
let moment = require('moment');
let emailValidator = require('email-validator');
let users = require("./../model/user");
let AuthResponse = require("../utils/AuthResponse");
let TokenGenerator = require("../utils/TokenGenerator");
let jwt = require('jsonwebtoken');
const config = require("../config/config");
let ResponseType1 = require('../utils/ResponseType1');
let AdminPermission = require('../utils/AdminPermission')


router.get('/', AdminPermission, function (req, res, next) {

    users.findAll().then(
        result => {
            res.send(new ResponseType1(true, result));
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "You are not authorized to do this operation."));
        }
    );
    }
);

router.post('/registration', async function (req, res, next) {

    let firstName = req.body.firstName;
    let secondName = req.body.secondName;
    let email = req.body.email;
    let password = req.body.password;

    if (!emailValidator.validate(email)) {
        res.send(new AuthResponse(false, "Email is incorrect"));
        return;
    }

    try {
        let dbUser = await users.findOne({
            where: {
                email: email
            }
        });
        if (dbUser) {
            res.status(200);
            res.send(new AuthResponse(false, "Account with this email already exist"));
            return;
        }
    } catch (err) {
        res.status(200);
        res.send(new AuthResponse(false, "Something gone wrong 1"));
        return;
    }

    const user = {
        firstName: firstName,
        secondName: secondName,
        email: email,
        password: password,
        permissionType: 1
    }

    try {
        await users.create(user);
    } catch (err) {
        console.log(err);
        res.status(200);
        res.send(new AuthResponse(false, "Something gone wrong 2"));
        return;
    }

    res.send(new AuthResponse(true, "User created"));
});


router.post('/authenticate', async function (req, res, next) {

    let email = req.body.email;
    let password = req.body.password;

    if (!emailValidator.validate(email)) {
        res.send(new AuthResponse(false, "Email is incorrect"));
        return;
    }


    let dbUser = await users.findOne({
        where: {
            email: email
        }
    });

    if (!dbUser) {
        res.status(200);
        res.send(new AuthResponse(false, "User with given email doesn't exist"));
        return;
    }

    let dbUserData = dbUser.dataValues;

    const tokenData = {
        userID: dbUserData.userID,
        email: email,
        password: password,
        permissionType: dbUserData.permissionType
    };

    res.status(200);
    res.send(new AuthResponse(true, TokenGenerator(tokenData, true)));
});


router.get('/checkUserToken', async function(req, res, next) {

    let token = req.headers['x-access-token'];

    jwt.verify(token, config.jwtTokenSecretKey, function (error, decoded) {
        if(error) {
            res.status(200);
            res.send(new ResponseType1(false, "Invalid token"));
            return;
        }
        res.send(new ResponseType1(true, decoded));
    });

});


router.put('/permissionType', AdminPermission,  async function (req, res, next) {

        const userID = req.body.userID;
        const firstName = req.body.firstName;
        const secondName = req.body.secondName;
        const email = req.body.email;
        const permissionType = req.body.permissionType;

        let changedPermissionType = null;

        if(permissionType === 1){
            changedPermissionType = 2;
        }else if (permissionType === 2){
            changedPermissionType = 1;
        }


    const user = {
        userID: userID,
        firstName: firstName,
        secondName: secondName,
        email: email,
        permissionType: changedPermissionType
    };

        users.findOne({
            where: {
                userID: userID
            }
        }).then(
            result => {
                if(!result) {
                    res.send(new ResponseType1(false, "User with this userID does not exist"));
                    return;
                }

                users.update(user, {
                        where: {
                            userID: userID
                        }
                    }
                ).then(
                    result => {
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

router.get('/sortByEmailAsc', async function (req, res, next) {

    let response = await users.findAll({
        order: [
            ['email', 'ASC']
        ]
    });
    res.send(response);

});

router.get('/sortByEmailDesc', async function (req, res, next) {

    let response = await users.findAll({
        order: [
            ['email', 'DESC']
        ]
    });
    res.send(response);

});

router.get('/sortByPermissionTypeAsc', async function (req, res, next) {

    let response = await users.findAll({
        order: [
            ['permissionType', 'DESC']
        ]
    });
    res.send(response);

});

router.get('/sortByPermissionTypeDesc', async function (req, res, next) {

    let response = await users.findAll({
        order: [
            ['permissionType', 'ASC']
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