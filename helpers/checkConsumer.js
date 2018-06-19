module.exports = function(req){
	let body = req.query;
	if("consumer_id" in body){
		return true;
	}else{
		return false;
	}
};