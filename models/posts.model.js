var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    
});

var PostModel = mongoose.model('posts', PostSchema);

module.exports = PostModel;