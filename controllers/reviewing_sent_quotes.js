let Contractor = require('../models/Contractor');
let Quote = require('../models/Quotes');
let checkLogin = require('../helpers/check_login');
let reviewQuote = require('../helpers/review_quotes');

module.exports = (req, res)=>{
	if(checkLogin(req)){
		let contractor_id = req.query.contractor_id;
		new Contractor({id: contractor_id})
			.fetch()
			.then(model=>{reviewQuote(model, req, res, Quote);});
	}else{
		res.jsonp({error: 'not signedin'});
	}
	
};