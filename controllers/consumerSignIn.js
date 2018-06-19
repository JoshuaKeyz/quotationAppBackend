let emailValidator = require("../helpers/email_validator");
let Consumer = require("../models/Consumer");
module.exports = function(req, res){
	if(emailValidator(req.body.email)){
		new Consumer({email: req.body.email, password: req.body.password})
			.fetch()
			.then(function(model){
				if(model){
					req.session.isLoggedIn = true;
					res.jsonp({status: "success"});
				}else{
					res.jsonp({error: "incorrect username/password"});
				}
			});
	}else{
		res.jsonp({error: "invalid email supplied"});
	}
};