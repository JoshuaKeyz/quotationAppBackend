let handleQuotes = require('./handle_quotes');
let checkAction = require('../helpers/check_action');
let checkQuotes = require('../helpers/check_quotes');

module.exports = function isConsumerRegistered(model, req, res, Quotes){
	if(!model){	//Checks if the consumer_id provided is registered
		res.jsonp({error: 'unregistered user'});
		return;
	}
	
	if(!checkQuotes(req)){	//Check if the quotes to be handled is provided in the request
		res.jsonp({error: 'invalid quote'});
		return;
	}
	if(!checkAction(req)){	//Checks if the action ("reject" or "accept" is present)
		res.jsonp({error: 'invalid action'});
		return;
	}

	new Quotes({consumer_id: req.query.consumer_id, id: req.body.quote_id})
		.fetch()
		.then(model=>{
			handleQuotes(model,req, res, Quotes);
		});
};