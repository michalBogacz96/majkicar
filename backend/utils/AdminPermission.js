const config = require("./../config/config");
let jwt = require('jsonwebtoken');
let ResponseType1 = require("./ResponseType1");
let users = require("./../model/user");


function checkToken(req, res, next) {
    let token = req.headers['x-access-token'];
    console.log(token);
    jwt.verify(token, config.jwtTokenSecretKey, function (error, decoded) {
        if (error) {
            console.log(error);
            res.status(200);
            res.send(new ResponseType1(false, "Unauthorized access. Please Sign In"));
            return;
        }

        users.findOne({
            where: {
                userID: decoded.userID
            }
        }).then(result => {

            if (result.dataValues.permissionType == 2) {
                req.token = decoded;
                next();
            } else {
                res.status(200);
                res.send(new ResponseType1(false, "You are not authorized to do this operation."));
                return;
            }
        }).catch(
            err => {
                res.status(200);
                res.send(new ResponseType1(false, "You are not authorized to do this operation."));
                console.log(err);
                return;
            }
        );
    });
}

module.exports = checkToken;