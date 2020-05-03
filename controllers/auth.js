var express = require('express');
var router = express.Router();
var config = require('../config/index');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var UserModel = require('../models/user.model');
var mapUser = require('../helpers/map_user_req');

// To GENETRATE TOKEN

function generateToken(user) {
    return jwt.sign({ _id: user._id, roless: user.roles }, config.jwtSecretKey, { expiresIn : '24h'});
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
                   return res.json({ success: false, message: 'Username, email or Number already exists.' });
                } else {
                    // Check if error is a validation error.
                    if (err.errors) {
                        // Check if validation error is in email field
                        if (err.errors.email) {
                           return res.json({ success: false, message: err.errors.email.message });
                        } else {
                            // Check if validation error is in the username field
                            if (err.errors.username) {
                               return res.json({ success: false, message: err.errors.username.message }); // Return error
                            } else {
                                // Check if validation error is in the password field
                                if (err.errors.password) {
                                   return res.json({ success: false, message: err.errors.password.message }); // Return error
                                } else {
                                  return  res.json({ success: false, message: err }); // Return any other error not already covered
                                }
                            }
                        }
                    } else {
                      return   res.json({ success: false, message: `Could not save user. Error: ${err}` });
                    }
                }
            } else {
               return  res.json({ success: true, message: 'Account registererd!' })
            }
        })
    });

router
    .post('/login', function (req, res, next) {
        console.log('Requested data => ', req.body);

        UserModel.findOne({ email: req.body.email })
            .exec(function (err, user) {
                if (err) {
                    return res.json({
                        success: false,
                        error: err,
                        status: 500
                    });
                }
                if (user) {
                    var passwordMatch = passwordHash.verify(req.body.password, user.password);
                    if (passwordMatch) {
                        var token = generateToken(user);
                        return res.json({
                            success: true,
                            user: {
                                username : user.username
                            },
                            token: token,
                            message: 'Success!',
                            status: 200
                        });
                    } else {
                        return res.json({
                            success: false,
                            message: 'Password didnt match. Try again.',
                            status: 401
                        })
                    }
                } else {
                    return res.json({
                        success: false,
                        message: 'Invalid Email',
                        status: 401
                    })
                }
            })
    }); 

module.exports = router;