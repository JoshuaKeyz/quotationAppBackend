let Consumer = require("../models/Consumer")

module.exports = function(id){
    new Consumer({id: id})
    .fetch()
    .then(function(model){
        if(model){
            return true;
        }else{
            return false;
        }
    })
}