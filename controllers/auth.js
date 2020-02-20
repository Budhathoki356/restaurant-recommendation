var express = require('express');
var router = express.Router();
var config = require('../config/index');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var UserModel = require('../models/user.model');
var mapUser = require('../helpers/map_user_req');

// To GENETRATE TOKEN

function generateToken(user) {
    return jwt.sign({ _id: user._id }, config.jwtSecretKey);
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
            // Check if error occured
            if (err) {
                // Check if error is an error indicating duplicate account
                if (err.code === 11000) {
                    res.json({ success: false, message: 'Username or email already exists.' });
                } else {
                    // Check if error is a validation error.
                    if (err.errors) {
                        // Check if validation error is in email field
                        if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        } else {
                            // Check if validation error is in the username field
                            if (err.errors.username) {
                                res.json({ success: false, message: err.errors.username.message }); // Return error
                            } else {
                                // Check if validation error is in the password field
                                if (err.errors.password) {
                                    res.json({ success: false, message: err.errors.password.message }); // Return error
                                } else {
                                    res.json({ success: false, message: err }); // Return any other error not already covered
                                }
                            }
                        }
                    } else {
                        res.json({ success: false, message: `Could not save user. Error: ${err}` });
                    }
                }
            } else {
                res.json({ success: true, message: 'Account registererd!', user: done })
            }
        })
    })

    .post('/login', function (req, res, next) {
        console.log('Requested data => ', req.body);

        UserModel.findOne({ email: req.body.email })
            .exec(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: err
                    });
                }
                if (user) {
                    var passwordMatch = passwordHash.verify(req.body.password, user.password);
                    if (passwordMatch) {
                        var token = generateToken(user);
                        return res.status(200).json({
                            user: user,
                            token: token
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'Password didnt match. Try again.'
                        })
                    }
                } else {
                    return res.status(401).json({
                        message: 'Invalid Email'
                    })
                }
            })
    });


module.exports = router;