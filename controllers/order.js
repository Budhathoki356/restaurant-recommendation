var express = require('express');
var router = express.Router();

var OrderModel = require('../models/order.model');
var mapOrder = require('../helpers/map_order_req');

router.route('/')
    .get(function (req, res, next) {
        OrderModel.find({})
            .populate('user', {
                _id: 1
            })
            .populate('fooditem', {
                _id: 1
            })
            .exec(function (err, order) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                return res.status(201).json({
                    message: 'All orders',
                    order: order
                })
            })
    })
    .post(function (req, res, next) {
        var newOrder = new OrderModel({});
        var mappedOrder = mapOrder(newOrder, req.body);
        mappedOrder.user = req.loggedInUser._id; // user id 
        mappedOrder.save(function (err, order) {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            return res.status(201).json({
                message: 'Success order',
                order: order
            })
        })
    });

router.route('/:orderId')
    .get(function (req, res, next) {
        var orderId = req.params.orderId;
        OrderModel.findById({ _id: orderId })
            .then(order => {
                if (!order) {
                    return res.status(404).json({
                        message: 'Order not found.'
                    })
                }
                return res.status(201).json({
                    message: 'Order found.',
                    order: order
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
    })
    .put(function (req, res, next) {
        var orderId = req.params.orderId;
        OrderModel.findById({ _id: orderId })
            .exec()
            .then(order => {
                if (!order) {
                    return res.status(404).json({
                        message: 'Order not found.'
                    })
                }
                var updatedOrder = mapOrder(order, req.body);
                updatedOrder.save(function (err, done) {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    res.status(200).json(done);
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
    })
    .delete(function (req, res, next) {
        var orderId = req.params.orderId;
        OrderModel.findOne({ _id: orderId })
            .exec(function (err, order) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                if (order) {
                    // delete selected order
                    order.remove(function (err, done) {
                        if (err)
                            return res.status(500).json({
                                error: err
                            });
                        return res.status(200).json({
                            message : 'order deleted'
                        });
                    })
                } else {
                    return res.status(404).json({
                        message: 'Order not found',
                    })
                }
            });
    })

module.exports = router;