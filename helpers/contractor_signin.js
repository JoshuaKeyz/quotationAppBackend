module.exports = function contractorSignin(model, res, req){
	if(model){
		req.session.isLoggedIn = true;
		req.session.contractor_id = model.toJSON.id;
		res.jsonp({status: 'success', contractor_id: model.id});
	}else{
		res.jsonp({error: 'incorrect username/password'});
	}
};