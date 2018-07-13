module.exports = function(email){
	if(!email){
		return false;
	}else if(email.indexOf('@') < 2){
		return false;
	}else{
		return true;
	}
};