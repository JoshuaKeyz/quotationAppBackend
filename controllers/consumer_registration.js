let emailValidator = require('../helpers/email_validator');
let sufficiencyValidator = require('../helpers/sufficiency_validator');
let Consumer = require('../models/Consumer');
let consumerRegistration = require('../helpers/consumer_registration');

module.exports = (req, res)=>{
	if(!sufficiencyValidator(req.body)){
		res.jsonp({error: 'insufficient values provided'});	
		return;
	}

	if(emailValidator(req.body.email)){
		new Consumer({email: req.body.email})
			.fetch()
			.then(model => consumerRegistration(model,req, res, Consumer));
	}else{
		res.jsonp({error: 'invalid email provided'});
	}
};