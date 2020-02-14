var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var authRoute = require('./controllers/auth');
require('./config/mongoose.config');

// body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// serving static files
app.use('/file', express.static(__dirname + '/file'));

// middleware for authentication
app.use('/auth', authRoute);

app.listen(1337,function (err, data)    {
    if(err) 
        console.log('Fail to connect.');
    
    console.log('Listening at port 1337.');
});
