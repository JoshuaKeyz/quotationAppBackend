module.exports = function(req){
    if(
        req.body.contractor_id &&
        req.body.consumer_id &&
        req.body.labor &&
        req.body.expenses &&
        req.body.sales_task &&
        req.body.miscellaneous &&
        req.body.total   
    ){
        return true;
    }else{
        return false;
    }
}