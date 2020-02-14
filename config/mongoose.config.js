var mongoose = require('mongoose');
var config = require('./index');

mongoose.connect(config.dbUrl + '/' + config.dbName, function (err, done) {
    if(err) 
        console.log('Error in connecting to db.');
    else 
        console.log('db connection success.');
});