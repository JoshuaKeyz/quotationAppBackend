let Contractor = require('../models/Contractor');
let Consumer = require('../models/Consumer');
let Quotes = require('../models/Quotes');
let validQuoteFields = require('../helpers/validate_quote_fields');
let handleContractor = require('../helpers/handle_contractor');


module.exports = function(req, res){
	if(!req.session.isLoggedIn){
		res.jsonp({error: 'not signedIn'});
		return;
	}

	if(!validQuoteFields(req)){
		res.jsonp({error: 'invalid quotation'});
		return;
	}
	
	new Contractor({id: req.body.contractor_id})
		.fetch()
		.then((model)=> {handleContractor(model, req, res, Consumer, Quotes);});
};