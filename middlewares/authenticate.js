var jwt = require('jsonwebtoken');
var config = require('../config/index');
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;


module.exports = function (req, res, next) {
    var token;

    if (req.headers.token) {
        token = req.headers.token.split(" ")[1];
    }
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'].split(" ")[1];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(" ")[1];
    }
    if (req.query.token) {
        token = req.query.token.split(" ")[1]
    }

    if (token) {
        jwt.verify(token, config.jwtSecretKey, function (err, verified) {
            if (err) {
                return next(err);
            }
            console.log('token verified with data');
            // now check weather that user exists in system or not
            MongoClient.connect(config.dbUrl, { useUnifiedTopology: true }, function (err, client) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                var db = client.db(config.dbName);
                db.collection('users')
                    .find({ _id: new mongodb.ObjectID(verified._id) })
                    .toArray(function (err, users) {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        }
                        if (Array.isArray(users) && users.length) {
                            req.loggedInUser = users[0];
                            return next();
                        } else {
                            return res.status(404).json({
                                message: 'User is removed from system.'
                            });
                        }
                    })
            })
        });
    } else {
        return res.status(400).json({
            message: 'Token not provided. Auth Invalid.'
        })
    }
}

