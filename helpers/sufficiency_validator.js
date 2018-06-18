module.exports = function(obj){
    if(obj.email && obj.password && obj.first_name && obj.last_name && obj.location){
        return true;
    }else{
        return false;
    }
}