let Quotes = require('../models/Quotes');
let coordist = require('coordist');
let checkLogin = require('../helpers/check_login');
let consumerGetQuotes = require('../helpers/consumer_get_quotes');

module.exports = function(req, res){
	if(checkLogin(req)){
		let consumer_id = req.query.consumer_id;
		new Quotes({consumer_id: consumer_id})
			.fetchAll({withRelated: ['consumer_id', 'contractor_id']})
			.then(model => consumerGetQuotes(model, res, coordist));
	}else{
		res.jsonp({error: 'not signedIn'});
	}
};