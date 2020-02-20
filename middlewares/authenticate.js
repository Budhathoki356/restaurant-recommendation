var jwt = require('jsonwebtoken');
var config = require('../config/index');

module.exports = function (req, res, next) {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token,config.jwtSecretKey);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            messsage: 'Auth failed.'
        })
    }
}

