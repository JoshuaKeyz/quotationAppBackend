module.exports = function(req){
	if(req.body.action == "accept" || req.body.action == "reject"){
		return true;
	}else{
		return false;
	}
};