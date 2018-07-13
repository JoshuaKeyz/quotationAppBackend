module.exports = function consumerSignin(model, res, req){
	if(model){
		req.session.isLoggedIn = true;
		res.jsonp({status: 'success', consumer_id: model.id});
	}else{
		res.jsonp({error: 'incorrect username/password'});
	}
};