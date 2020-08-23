module.exports = function map_foodItem_req(foodItem, foodItemDetails) {
    if (foodItemDetails.foodName)
        foodItem.foodName = foodItemDetails.foodName;
    if (foodItemDetails.quantity)
        foodItem.quantity = foodItemDetails.quantity;
    if (foodItemDetails.restaurant_id)
        foodItem.restaurant_id = foodItemDetails.restaurant_id;
    if (foodItemDetails.unitPrice)
        foodItem.unitPrice = foodItemDetails.unitPrice;
    if (foodItemDetails.foodCategory)
        foodItem.foodCategory = foodItemDetails.foodCategory;
    if (foodItemDetails.image)
        foodItem.image = foodItemDetails.image;
    if (foodItemDetails.description)
        foodItem.description = foodItemDetails.description;

    return foodItem;
}