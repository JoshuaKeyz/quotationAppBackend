let emailValidator = require("../helpers/email_validator");
let Contractor = require("../models/Contractor");
module.exports = function(req, res){
	if(emailValidator(req.body.email)){
		new Contractor({email: req.body.email, password: req.body.password})
			.fetch()
			.then(function(model){
				if(model){
					req.session.isLoggedIn = true;
					req.session.contractor_id = model.toJSON.id;
					res.jsonp({status: "success", contractor_id: model.id});
				}else{
					res.jsonp({error: "incorrect username/password"});
				}
			});
	}else{
		res.jsonp({error: "invalid email supplied"});
	}
};