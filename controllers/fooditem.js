const fs = require('fs')
// models
const RestaurantModel = require('../models/restaurant.model')
const FoodItemModel = require('../models/foodItem.model')

// helpers
const mapRestaurant = require('../helpers/map_restaurant_req');
const mapFoodItem = require('../helpers/map_fooditem_req')



const create = (req, res, next) => {
    if (req.file) {
        const mimeType = req.file.mimetype;
        const image = mimeType.split("/")[0];

        if (image != 'image') {
            fs.unlink('./images/' + req.file.filename);
            return next({
                message: 'invalid file format',
                status: 400
            })
        }

        req.body.image = req.file.filename
    }
    const newFoodItem = new FoodItemModel({})
    const mappedFoodItem = mapFoodItem(newFoodItem, req.body)

    RestaurantModel.find({ 'user': req.decoded._id }, (err, restaurant) => {
        if (err) { return next(err) }
        if (!restaurant) {
            return next({
                message: 'Restaurant Not found',
                status: 400
            })
        }
        currentRestaurant = restaurant[0]
        mappedFoodItem.restaurant_id = currentRestaurant._id

        mappedFoodItem.save((err, done) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(done)
        })
    })
}

const findAll = (req, res, next) => {
    FoodItemModel.find({})
    .then(food => {
        if (!food) {
            return next({
                message: 'No food found.'
            })
        }
        res.status(200).json(food)
    })
    .catch(err => {
        return next(err)
    })
}

const updateFoodItem = (req, res, next) => {
    const id = req.params.id
    if (req.file) {
        const mimeType = req.file.mimetype;
        const image = mimeType.split("/")[0];

        if (image != 'image') {
            fs.unlink('./images/' + req.file.filename);
            return next({
                message: 'invalid file format',
                status: 400
            })
        }

        req.body.image = req.file.filename
    }
    FoodItemModel.findById(id, (err, food) => {
        if (err) { return next(err) }

        const oldImage = food.image;
        const updatedMapItem = mapFoodItem(food, req.body);
        updatedMapItem.save((err, updated) => {
            if (err) { return next(err) }
            if (req.file) {
                fs.unlinkSync('./files/images/' + oldImage)
            }
            res.status(200).json({
                restaurant: updated,
                message: 'Food item is updated successfully.'
            })

        })
    })

}

const deleteFood = (req, res, next) => {
    const id = req.params.id

    FoodItemModel.findByIdAndRemove(id)
        .then(food => {
            if(!food) {
                return next({
                    message: 'Food not found',
                    status: 400
                })
            }
        })
        res.status(200).json({
            message: 'Food item deleted.'
        })
}

module.exports = {
    create,
    updateFoodItem,
    findAll,
    deleteFood
}