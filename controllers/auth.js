var express = require('express');
var router = express.Router();
var config = require('../config/index');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var UserModel = require('../models/user.model');
var mapUser = require('../helpers/map_user_req');

// To GENETRATE TOKEN

function generateToken(user){
    return jwt.sign({_id: user._id}, config.jwtSecretKey);
}


router
    .post('/register', function (req, res, next) {
        console.log('Requested data => ', req.body);

        // Instance of User Model is created.
        var newUser = new UserModel({});
        var newMappedUser = mapUser(newUser, req.body);
        if (req.body.password) {
            newMappedUser.password = passwordHash.generate(req.body.password);
        };

        newMappedUser.save(function (err, done) {
            if (err)
                return next(err);
            else
                res.status(200).json(done);
        })
    })

    .post('/login', function (req, res, next) {
        console.log('Requested data => ', req.body);

        UserModel.findOne({
            email: req.body.email
        })
            .exec(function (err, user) {
                if (err) return next(err);

                if (user) {
                    var passwordMatch = passwordHash.verify(req.body.password, user.password);
                    if (passwordMatch) {
                        var token = generateToken(user);
                        res.status(200).json({
                            user: user,
                            token: token 
                        });
                    } else {
                        next({
                            message:'Password didnt match. Try again.',
                            status: 400,
                        })
                    }
                } else {
                    return next({
                        message: 'Invalid Email',
                        status: 400
                    })
                }
            })
    });


module.exports = router;