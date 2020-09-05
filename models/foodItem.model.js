var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodItemSchema = new Schema({
    foodName: {
        type: String,
        require: true,
        lowercase: true
    },
    quantity: {
        type: Number,
        default: 0,
        require: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    unitPrice: {
        type: Number,
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