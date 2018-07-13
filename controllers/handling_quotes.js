let checkLogin = require('../helpers/check_login');
let checkConsumer = require('../helpers/check_consumer');

let Consumer = require('../models/Consumer');
let Quotes = require('../models/Quotes');
let isConsumerRegistered = require('../helpers/is_consumer_registered');


module.exports = function(req, res){
	if(checkLogin(req)){	//Checks for login
		if(checkConsumer(req)){	//Checks if the consumer_id is
			// provided in the query string
			new Consumer({id: req.query.consumer_id})
				.fetch()
				.then(model =>{isConsumerRegistered(model, req, res, Quotes);});
		}else{
			res.jsonp({error: 'invalid request'});
		}
	}else{
		res.jsonp({error: 'not signedIn'});
	}
};