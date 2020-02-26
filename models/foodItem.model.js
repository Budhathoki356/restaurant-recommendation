var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodItemSchema = new Schema({
    food_name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    unit_price: {
        type: Number,
        require: true
    },
    food_category: {
        type: String,
    },
    image: String,
    description: {
        type: String
    }
});

var FoodItemModel = mongoose.model('foodItem', FoodItemSchema);

module.exports = FoodItemModel;