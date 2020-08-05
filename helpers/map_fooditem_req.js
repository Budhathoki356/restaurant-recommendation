module.exports = function map_foodItem_req(foodItem, foodItemDetails) {
    if (foodItemDetails.restaurantname)
        foodItem.food_name = foodItemDetails.foodItemname;
    if (foodItemDetails.quantity)
        foodItem.quantity = foodItemDetails.quantity;
    if (foodItemDetails.restaurantName)
        foodItem.restaurantName = foodItemDetails.restaurantName;
    if (foodItemDetails.unitPrice)
        foodItem.unit_price = foodItemDetails.unitPrice;
    if (foodItemDetails.foodCategory)
        foodItem.food_category = foodItemDetails.foodCategory;
    if (foodItemDetails.image)
        foodItem.image = foodItemDetails.image;
    if (foodItemDetails.description)
        foodItem.description = foodItemDetails.description;
    if (foodItemDetails.user)
        foodItem.user = foodItemDetails.user;

    return foodItem;
}