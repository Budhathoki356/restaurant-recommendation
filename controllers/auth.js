var express = require('express');
var router = express.Router();
var config = require('../config/index');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var UserModel = require('../models/user.model');
var mapUser = require('../helpers/map_user_req');

// To GENETRATE TOKEN

function generateToken(user) {
    return jwt.sign({ _id: user._id, role: user.role }, config.jwtSecretKey, { expiresIn : '24h'});
}

router.post('/register', async function (req, res) {
    console.log('Requested data => ', req.body);

    try {
        // Create an instance of the User Model
        let newUser = new UserModel({});
        let newMappedUser = mapUser(newUser, req.body);

        // If password is provided, hash it before saving
        if (req.body.password) {
            newMappedUser.password = passwordHash.generate(req.body.password);
        }

        // Save the new user document
        const savedUser = await newMappedUser.save(); // This is now a promise, no callback needed

        // Respond with success if user is saved
        res.json({ success: true, message: 'Account registered successfully!' });
    } catch (err) {
        // Handle MongoDB error, including duplicate and validation errors
        if (err.code === 11000) {
            return res.json({ success: false, message: 'Username, email, or phone number already exists.' });
        }

        // Handle validation errors
        if (err.errors) {
            // Check for validation errors in specific fields
            if (err.errors.email) {
                return res.json({ success: false, message: err.errors.email.message });
            } else if (err.errors.username) {
                return res.json({ success: false, message: err.errors.username.message });
            } else if (err.errors.password) {
                return res.json({ success: false, message: err.errors.password.message });
            } else {
                return res.json({ success: false, message: `Validation error: ${err}` });
            }
        }

        // Handle any other errors
        res.json({ success: false, message: `Could not save user. Error: ${err.message || err}` });
    }
});

router.post('/login', async function (req, res) {
    console.log('Requested data => ', req.body);

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: req.body.email });

        if (user) {
            // Check if the password matches
            const passwordMatch = passwordHash.verify(req.body.password, user.password);
            if (passwordMatch) {
                // Generate JWT token
                const token = generateToken(user);

                return res.json({
                    success: true,
                    user: {
                        username: user.username,
                        role: user.role,
                        user_id: user._id
                    },
                    token: token,
                    message: 'Success!',
                    status: 200
                });
            } else {
                // Incorrect password
                return res.json({
                    success: false,
                    message: 'Password didn\'t match. Try again.',
                    status: 401
                });
            }
        } else {
            // No user found
            return res.json({
                success: false,
                message: 'Invalid Email',
                status: 401
            });
        }
    } catch (err) {
        // Handle unexpected errors
        return res.json({
            success: false,
            error: err,
            status: 500
        });
    }
});


module.exports = router;