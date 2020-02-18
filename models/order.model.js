var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({

});

var OrderModel = mongoose.model('orders', OrderSchema);

module.exports = OrderModel;cl