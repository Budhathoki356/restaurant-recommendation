var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var authorize = require('../middlewares/authorize');
var fs = require('fs');
var multer = require('multer');

// models
var FoodModel = require('../models/foodItem.model');
var UserModel = require('../models/user.model');

// helpers
var mapUser = require('../helpers/map_user_req');
var mapFood = require('../helpers/map_foodItem_req');

/**
 * routes for fooditems
 * */

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'  ) {
        cb(null, true);
    } else {
        req.fileUplaodFailed = true;
        cb(null, false);
    }
}
var upload = multer({
    storage: storage,
});


router.route('/foodItem')
    .get(function (req, res, next) {
        var condition = {};
        condition.user = req.loggedInUser._id;
        console.log('req.body is >>>>>', req.body);
        console.log('id==', req.loggedInUser._id);
        FoodModel.find(condition)
            .sort({
                _id: -1
            })
            .populate('user', {
                _id: 1,
                activeStatus: 1,
                role: 1
            })
            .exec(function (err, items) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                return res.status(200).json(items);
            })
    })
    .post(authorize, upload.single('image'), function (req, res, next) {
        var newFoodItem = new FoodModel({});
        console.log('req.body for fooditem =', req.body);
        console.log('req.body for fooditem =', req.file);
        if(req.file){
            var mimetype = req.file.mimetype;
            var image = mimetype.split("/")[0];
            if(image != 'image') {
                fs.unlink('./files/images/' + req.file.filename, function(err ,done){
                    if(err) {
                        console.log('Delection failed');
                    } else {
                        console.log('File delete success.');
                    }
                });
                return res.status(400).json({
                    message: 'Invalid file format'
                })
            };
            req.body.image = req.file.filename;
        }
        console.log('file req == ',req.body.image = req.file.filename);
        var mappedFood = mapFood(newFoodItem, req.body);
        mappedFood.user = req.loggedInUser._id;
        mappedFood.save(function (err, saved) {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            return res.status(200).json(saved);
        })
    })

/**
 * GET all user
 * */
router.route('/')
    .get(function (req, res, next) {
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
    .put(function (req, res, next) {
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
