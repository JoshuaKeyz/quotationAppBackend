let emailValidator = require('../helpers/email_validator');
let Contractor = require('../models/Contractor');
let contractorSignin = require('../helpers/contractor_signin');

module.exports = function(req, res){
	if(emailValidator(req.body.email)){
		new Contractor({email: req.body.email, password: req.body.password})
			.fetch()
			.then(model => contractorSignin(model, res, req));
	}else{
		res.jsonp({error: 'invalid email supplied'});
	}
};