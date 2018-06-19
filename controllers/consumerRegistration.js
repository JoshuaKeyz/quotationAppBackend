let emailValidator = require("../helpers/email_validator");
let sufficiencyValidator = require("../helpers/sufficiency_validator");
let Consumer = require("../models/Consumer");

module.exports = (req, res)=>{
	if(sufficiencyValidator(req.body)){
		if(emailValidator(req.body.email)){
			new Consumer({email: req.body.email})
				.fetch()
				.then(function(model){
					if(model){
						res.jsonp({error: "email already registered"});
					}else{
						var obj = req.body;
						new Consumer({
							id: obj.id,
							first_name: obj.first_name, 
							last_name: obj.last_name,
							email: obj.email,
							password: obj.password,
							location: obj.location
						})
							.save(null, {method: "insert"})
							.then(function(model){
								res.jsonp(model.toJSON());
							});
							
					}
				});
		}else{
			res.jsonp({error: "invalid email provided"});
		}
	}else{
		res.jsonp({error: "insufficient values provided"});
	}
};