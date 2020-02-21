var mongoose = require('mongoose');
var config = require('./index');

mongoose.set('useCreateIndex', true);

mongoose.connect(config.dbUrl + '/' + config.dbName, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, done) {
    if (err)
        console.log('Error in connecting to db.');
    else
        console.log('db connection success.');
});