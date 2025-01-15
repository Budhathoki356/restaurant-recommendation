var express = require('express');
var router = express.Router();

// models
var UserModel = require('../models/user.model');

router.route('/profile')
    .get(async function (req, res, next) {
        const userid = req.decoded._id;

        try {
            // Use async/await to find the user by ID
            const user = await UserModel.findById(userid);

            if (user) {
                // If user is found, send back the user object with 200 OK
                return res.status(200).json(user);
            } else {
                // If user is not found, return a 404 Not Found response
                return res.status(404).json({
                    message: 'User not found.'
                });
            }
        } catch (err) {
            // If there's an error with the query or any other issue, return 500
            return res.status(500).json({
                error: err.message || 'An error occurred while fetching user profile.'
            });
        }
    });


module.exports = router;
