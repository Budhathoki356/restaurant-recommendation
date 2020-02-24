module.exports = function map_item_request(item, foodDetails) {
    if (foodDetails.food_name)
        item.food_name = foodDetails.food_name;
    if (foodDetails.unit_price)
        item.unit_price = foodDetails.unit_price;
    if (foodDetails.food_category)
        item.food_category = foodDetails.food_category;
    if (foodDetails.quantity)
        item.quantity = foodDetails.quantity;
    if (foodDetails.image)
        item.image = foodDetails.image;

    return item;
}
