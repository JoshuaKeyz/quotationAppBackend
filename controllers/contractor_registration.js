let emailValidator = require('../helpers/email_validator');
let sufficiencyValidator = require('../helpers/sufficiency_validator');
let Contractor = require('../models/Contractor');
let handleRegistration = require('../helpers/contractor_registration.js');

module.exports = (req, res)=>{
	if(!sufficiencyValidator(req.body)){
		res.jsonp({error: 'insufficient values provided'});
		return;
	}

	if(emailValidator(req.body.email)){
		new Contractor({email: req.body.email})
			.fetch()
			.then(model=>handleRegistration(model,req, res, Contractor));
	}else{
		res.jsonp({error: 'invalid email provided'});
	}
};