let checkLogin = require("../helpers/checkLogin");
let checkConsumer = require("../helpers/checkConsumer");
let checkAction = require("../helpers/checkAction");
let checkQuotes = require("../helpers/checkQuotes");
let Consumer = require("../models/Consumer");
let Quotes = require("../models/Quotes");

module.exports = function(req, res){
	if(checkLogin(req)){	//Checks for login
		if(checkConsumer(req)){	//Checks if the consumer_id is provided in the query string
			new Consumer({id: req.query.consumer_id})
				.fetch()
				.then(model=>{
					if(model){	//Checks if the consumer_id provided is registered
						if(checkQuotes(req)){	//Check if the quotes to be handled is in the database
							if(checkAction(req)){	//Checks if the action ("reject" or "accept" is present)
								new Quotes({consumer_id: req.query.consumer_id, id: req.body.quote_id})
									.fetch()
									.then(function(model){
										if(model){
											if(req.body.action == "accept"){	//checks if the action to be made is "accept"
												if(model.toJSON().status == "pending"){	//If the quote received is "pending" accept it.
													new Quotes({id: req.body.quote_id, consumer_id: req.query.consumer_id})
														.save("status", "accepted", {method: "update"})
														.then(function(model){
															res.jsonp(model.toJSON());
														});
												}else if(model.toJSON().status == "accepted"){ // if the quote was already accepted, return error
													res.jsonp({error: "quote already accepted"});
												}else{
													res.jsonp({error: "quote already rejected"}); // if the quote was already rejected, return error also
												}

											}else{	//else means that the action is "reject"
												if(model.toJSON().status == "pending"){		// checks if the quote is "pending", if so, reject it
													new Quotes({id: req.body.quote_id, consumer_id: req.query.consumer_id}) 
														.save("status", "rejected", {method: "update"})
														.then(function(model){
															res.jsonp(model.toJSON());
														});
												}else if(model.toJSON().status == "accepted"){ // if the quote was already "accept" return error
													res.jsonp({error: "quote already accepted"});	
												}else{
													res.jsonp({error: "quote already rejected"}); // if the quote was already "reject" (rejected), return error also
												}
											}
										}else{
											res.jsonp({error: "invalid quotation"});
										}
									});
                            
							}else{
								res.jsonp({error: "invalid action"});
							}
						}else{
							res.jsonp({error: "invalid quote"});
						}
					}else{
						res.jsonp({error: "unregistered user"});
					}
				});
		}else{
			res.jsonp({error: "invalid request"});
		}
	}else{
		res.jsonp({error: "not signedIn"});
	}
};