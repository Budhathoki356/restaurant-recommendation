var jwt = require('jsonwebtoken');
var config = require('../config/index');

module.exports = function(req, res, next) {
    if (req.decoded.role === 'restaurant') {
        return next();
    } else {
        return res.status(403).json({
            message: 'Permission denied.'
        })
    }
}
