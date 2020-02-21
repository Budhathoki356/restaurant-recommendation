var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var UserModel = require('../models/user.model');
var authorize = require('../middlewares/authorize');
var mapUser = require('../helpers/map_user_req');


/**
 * GET all user
 * */
router.route('/')
    .get(authorize, function (req, res, next) {
        UserModel.find({})
            .exec(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                return res.status(200).json(users);
            })
    });

/**
 *  Get user by Id
 */
router.route('/:id')
    .get(authorize, function (req, res, next) {
        console.log('\n req.params =>', req.params);
        var userid = req.params.id;
        UserModel.findById({ _id: userid }).exec(function (err, user) {
            if (err) return res.status(500).json({
                error: err
            });
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({
                    message: 'User not found.'
                })
            }
        })
    })

    // Update User By Id
    .put(authorize, function (req, res, next) {
        var userId = req.params.id;
        UserModel.findById({ _id: userId })
            .exec()
            .then(user => {
                if (user) {
                    var updatedUser = mapUser(user, req.body);
                    if (req.body.password) {
                        updatedUser.password = passwordHash.generate(req.body.password);
                    }
                    updatedUser.save(function (err, done) {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        }
                        res.status(200).json(done);
                    });
                } else {
                    return res.status(404).json({
                        message: 'User not found.'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err,
                })
            })
    })

    // delete user by id
    .delete(authorize, function (req, res, next) {
        var userId = req.params.id;
        UserModel.findOne({ _id: userId })
            .exec(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                if (user) {
                    user.remove(function (err, done) {
                        if (err)
                            return res.status(500).json({
                                error: err
                            });
                        return res.status(200).json(done);
                    })
                } else {
                    return res.status(404).json({
                        message: 'User not found',
                    })
                }
            });
    })



module.exports = router;
