module.exports = function consumerRegistration(model,req, res, Consumer){
	if(model){
		res.jsonp({error: 'email already registered'});
	}else{
		var obj = req.body;
		new Consumer({
			id: obj.id,
			first_name: obj.first_name, 
			last_name: obj.last_name,
			email: obj.email,
			password: obj.password,
			location: obj.location
		}).save(null, {method: 'insert'})
			.then(function(model){
				res.jsonp(model.toJSON());
			});
			
	}
};