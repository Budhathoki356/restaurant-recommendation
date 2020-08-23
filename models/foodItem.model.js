var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodItemSchema = new Schema({
    foodName: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        default: 0,
        require: true
    },
    restaurant_id: {
        type:Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    unitPrice: {
        type: Number,
        require: true
    },
    foodCategory: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
});

var FoodItemModel = mongoose.model('foodItem', FoodItemSchema);

module.exports = FoodItemModel;