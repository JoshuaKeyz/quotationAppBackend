module.exports = function(req){
	if(req.session.isLoggedIn){
		return true;
	}else{
		return false;
	}
};