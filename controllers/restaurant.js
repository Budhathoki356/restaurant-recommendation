
const fs = require('fs')
// models
const RestaurantModel = require('../models/restaurant.model')
const FoodModel = require('../models/foodItem.model')

// helpers
const mapRestaurant = require('../helpers/map_restaurant_req');
const map_restaurant_req = require('../helpers/map_restaurant_req');



const createRestaurant = (req, res, next) => {
    if (req.file) {
        var mimeType = req.file.mimetype;
        var image = mimeType.split("/")[0];

        if (image != 'image') {
            fs.unlink('./images/' + req.file.filename);
            return next({
                message: 'invalid file format',
                status: 400,
                success: false
            })
        }

        req.body.image = req.file.filename
    }
    const newRestaurant = new RestaurantModel({})
    const mappedRestaurant = mapRestaurant(newRestaurant, req.body)
    mappedRestaurant.user = req.decoded._id
    mappedRestaurant.isActive = true
    mappedRestaurant.save((err, done) => {
        if (err) {
            return next(err)
        }
        res.status(200).json({ success: true, message: 'Restaurant registered.', id: done._id })
    })
}

const findOne = (req, res, next) => {
    RestaurantModel.findById(req.params.id)
        .then(restaurant => {
            if (!restaurant) {
                return next({
                    message: 'Restaurant not found',
                    status: 400
                })
            }
            res.status(200).json(restaurant)

        })
        .catch(err => {
            return next(err)
        })
}

const findAll = (req, res, next) => {
    RestaurantModel.find({})
        .then(restaurant => {
            if (!restaurant) {
                return next({
                    message: 'No restaurants found.'
                })
            }
            res.status(200).json(restaurant)
        })
        .catch(err => {
            return next(err)
        })
}

const updateRestaurant = (req, res, next) => {
    var id = req.params.id;

    if (req.file) {
        var mimeType = req.file.mimetype;
        var image = mimeType.split("/")[0];

        if (image != 'image') {
            fs.unlink('./files/images/' + req.file.filename);
            return next({
                message: 'invalid file format',
                status: 400
            })
        }

        req.body.image = req.file.filename
    }

    RestaurantModel.findById(id, (err, item) => {
        if (err) { return next(err) }

        var oldImage = item.image;
        var updatedMapItem = map_restaurant_req(item, req.body);
        updatedMapItem.save((err, updated) => {
            if (err) { return next(err) }
            if (req.file) {
                fs.unlinkSync('./files/images/' + oldImage)
            }
            res.status(200).json({
                restaurant: updated,
                message: 'Restaurant is updated successfully.'
            })

        })
    })


}

const deleteRestaurant = (req, res, next) => {
    RestaurantModel.findById(req.params.id)
        .then(res => {
            if (!res) {
                return next({
                    message: 'Not found'
                })
            }
            fs.unlinkSync('./files/images/' + res.image)
        })

    RestaurantModel.findByIdAndRemove(req.params.id)
        .then(restaurant => {
            if (restaurant == undefined) {
                return next({
                    message: 'Restaurant not found',
                    status: 400
                })
            }
            res.status(200).json({
                restaurant: restaurant,
                message: 'Restaurant deleted successfully.'
            })

        })
        .catch(err => {
            return next(err)
        })
}

const checkUser = (req, res, next) => {
    const user_id = req.params.id
    RestaurantModel.find({ user: user_id })
        .then(result => { 
            if(!result) {
                res.status(200).json({
                    message: 'No restaurant',
                })
            }
            res.status(200).json(result)
        })
}


module.exports = {
    createRestaurant,
    findOne,
    findAll,
    updateRestaurant,
    deleteRestaurant,
    checkUser
};