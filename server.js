var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');

// load Middleware
var authRoute = require('./controllers/auth');
var userRoute = require('./controllers/users');
var orderRoute = require('./controllers/order');
var authenticate = require('./middlewares/authenticate');

require('./config/mongoose.config');

app.use(morgan('dev'));
app.use(cors());
// body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Set port
app.set('port', process.env.PORT || 5000);

// serving static files
app.use('/files', express.static(__dirname + '/files'));

// middleware for authentication
app.use('/auth', authRoute);
app.use('/user', authenticate, userRoute);
app.use('/order', authenticate, orderRoute);

// establish connections
app.listen(app.get('port'), function (err, data) {
    if (err)
        console.log('Fail to connect.');

    console.log('Listening at port ' + app.get('port'));
});
