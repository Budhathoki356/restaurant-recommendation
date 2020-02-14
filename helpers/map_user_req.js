module.exports = function map_user_req(user, userDetails){
    if(userDetails.username)
        user.username = userDetails.username;
    if(userDetails.email)
        user.email = userDetails.email;
    if(userDetails.password)
        user.password = userDetails.password;
    
    return user; 
}