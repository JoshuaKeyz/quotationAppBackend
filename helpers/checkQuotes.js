module.exports = function(req){
	if(!req.body.quote_id){
		return false;
	}else{
		return true;
	}
};