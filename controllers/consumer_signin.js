let emailValidator = require('../helpers/email_validator');
let Consumer = require('../models/Consumer');
let consumerSignin = require('../helpers/consumers_signin');

module.exports = function(req, res){
	if(emailValidator(req.body.email)){
		new Consumer({email: req.body.email, password: req.body.password})
			.fetch()
			.then(model => consumerSignin(model, res, req));
	}else{
		res.jsonp({error: 'invalid email supplied'});
	}
};