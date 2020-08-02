var multer = require('multer');

// models
var UserModel = require('../models/user.model')
var RestaurantModel =require('../models/restaurant.model')

// helpers
var mapUser = require('../helpers/map_user_req');

/**
 * File upload Handling
 * */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
    } else {
        req.fileUplaodFailed = true;
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


const createRestaurant = (req, res, next) => {
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
}

const getRestaurant = (req, res, next) => {
    var userId = req.decoded._id;
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
}

const deleteOneRestaurant = (req, res, next) => {
    var userId = req.decoded._id;
    UserModel.findOne({ _id: userId })
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            if (user) {
                // delete selected user
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
}

module.exports = {
    createRestaurant,
    getRestaurant,
    deleteOneRestaurant
};