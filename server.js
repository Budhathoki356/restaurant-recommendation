var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');

// load Middleware
var authRoute = require('./controllers/auth');
var userRoute = require('./controllers/users');
var authenticate = require('./middlewares/authenticate');

require('./config/mongoose.config');

// body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
// Set port
app.set('port', process.env.PORT || 5000);

// serving static files
app.use('/file', express.static(__dirname + '/file'));

// middleware for authentication
app.use('/auth', authRoute);
app.use('/user', authenticate, userRoute);

// establish connections
app.listen(app.get('port'), function (err, data) {
    if (err)
        console.log('Fail to connect.');

    console.log('Listening at port ' + app.get('port'));
});
