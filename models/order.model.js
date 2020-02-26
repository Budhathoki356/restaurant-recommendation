var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    pickupDate: {
        type: Date
    },
    foodItem: {
        type: Schema.Types.ObjectId,
        ref: 'fooditem',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

var OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;

