module.exports = function (order, orderDetails) {
    if (orderDetails.quantity)
        order.quantity = orderDetails.quantity;
    if (orderDetails.pickupDate)
        order.pickupDate = orderDetails.pickupDate;  
    if (orderDetails.foodItem)
        order.foodItem = orderDetails.foodItem;
    
    return order;
};