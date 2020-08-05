var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    restaurantName: {
        type: String,
        require: true
    },
    location: {
        type: String,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    phoneNo: {
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

var RestaurantModel = mongoose.model('restaurant', RestaurantSchema);

module.exports = RestaurantModel;