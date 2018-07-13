let Quotes = require('../models/Quotes');
let coordist = require('coordist');
let checkLogin = require('../helpers/check_login');
let contractorGetQuotes = require('../helpers/contractor_get_quotes');

module.exports = function(req, res){
	if(checkLogin(req)){
		let contractor_id = req.query.contractor_id;
		new Quotes({contractor_id: contractor_id})
			.fetchAll({withRelated: ['consumer_id', 'contractor_id']})
			.then(model=> contractorGetQuotes(model, res, coordist));
	}else{
		res.jsonp({error: 'not signedIn'});
	}
};