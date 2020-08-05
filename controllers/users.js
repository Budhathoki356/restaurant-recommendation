var express = require('express');
var router = express.Router();

// models
var UserModel = require('../models/user.model');

router.route('/profile')
    .get(function (req, res, next) {
        var userid = req.decoded._id;
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
    // .get((req, res, next) => {
    //     UserModel.find({})
    //         .then(users => {
    //             res.status(200).json({
    //                 users: users
    //             })
    //         })
    //         .catch(err => {
    //             return next(err)
    //         })
    // })

module.exports = router;
