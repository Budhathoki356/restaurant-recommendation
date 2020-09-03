module.exports = function map_restaurant_req(restaurant, restaurantDetails) {
    if (restaurantDetails.restaurantName)
        restaurant.restaurantName = restaurantDetails.restaurantName;
    if (restaurantDetails.phoneNo)
        restaurant.phoneNo = restaurantDetails.phoneNo;
    if (restaurantDetails.location)
        restaurant.location = restaurantDetails.location;
    if (restaurantDetails.description)
        restaurant.description = restaurantDetails.description;
    if (restaurantDetails.image)
        restaurant.image = restaurantDetails.image;

    return restaurant;
}