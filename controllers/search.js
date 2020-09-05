
const FoodItemModel = require('../models/foodItem.model')

const searchRestaurant = (req, res, next) => {
    let location = req.body.location.toLowerCase()
    let cuisine  = req.body.foodName.toLowerCase()

    FoodItemModel.find({ foodName: cuisine })
        .populate({ path: 'restaurant', match: { location: location } })
        .limit(10)
        .then(result => {
            if(result[0] == undefined) {
                return res.status(200).json({
                    success: false
                })
            }
            res.status(200).json(result)
        })
}

module.exports = {
    searchRestaurant
}