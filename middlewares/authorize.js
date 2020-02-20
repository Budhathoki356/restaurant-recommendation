var jwt = require('jsonwebtoken');
var config = require('../config/index');

module.exports = authorize;

function authorize(roles = []) {
    if(typeof roles === 'string') {
        roles = [roles];
    }

    return function(req, res,next) {
        if(roles.length && !roles.includes(req.loggedInUser.role)) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        // authorization successful
        next();
    }
}