var express = require('express');
var router = express.Router();
var config = require('../config/index');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var UserModel = require('../models/user.model');
var mapUser = require('../helpers/map_user_req');
var randomString = require('randomstring');
var mailSender = require('../config/nodemailer.config');

function createMail(data) {
    let mailOptions = {
        from: 'From RMS <norply@example.com>',
        to: `${data.email}`,
        subject: 'Forget Password',
        text: 'Forget password?',
        html: `<p><br> Hi, ${data.name}</br>,</p><p> We noticed that you are having trouble logging into our system, Please click the link below to reset your password </p>
        <p><a href='${data.link}' target="_blank">Password reset link.</a></p>
        <p>Regards, </p><p>RMS team.</p>`
    };

    return mailOptions;
}

// To GENETRATE TOKEN

function generateToken(user) {
    return jwt.sign({ _id: user._id, roless: user.roles }, config.jwtSecretKey);
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

router.post('/forgotPassword', function (req, res, next) {
    var email = req.body.email;
    if (!email) {
        return res.json({
            message: 'email not reqgistered yet.'
        })
    }
    UserModel.findOne({ email: email }).exec(function (err, user) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        if (user) {
            var expiryTime = new Date().getTime() + 1000 * 60 * 60 * 5;
            var passwordResetToken = randomString.generate(25);
            var passwordResetTokenExpiry = new Date(expiryTime);
            var prepareEmail = createMail({
                name: user.username,
                email: user.email,
                link: `${req.headers.origin}/auth/reset-password/${passwordResetToken}`
            });

            user.passwordResetToken = passwordResetToken;
            user.passwordResetTokenExpiry = passwordResetTokenExpiry;
            user.save(function (err, done) {
                if (err) {
                    return next(err);
                }
                // email pathaune
                mailSender.sendMail(prepareEmail, function (err, done) {
                    if (err) {
                        return next(err);
                    }
                    res.json(done);
                })
            });

        } else {
            next({
                message: 'Email not registered yet'
            });
        }
    })
});

router.post('/reset-password/:token', function (req, res, next) {
    UserModel.findOne({
        passwordResetToken: req.params.token
    }).exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            if (new Date(user.passwordResetTokenExpiry).getTime() > Date.now()) {
                user.password = passwordHash.generate(req.body.password);
                user.passwordResetToken = null;
                user.passwordResetTokenExpiry = null;
                user.save(function (err, done) {
                    if (err) {
                        return next(err);
                    }
                    res.json(done);
                })
            } else {
                next({
                    message: "password reset link expired"
                })
            }
        } else {
            next({
                message: "token expired or invalid token"
            });
        }
    })
});

module.exports = router;