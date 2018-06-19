let checkLogin = require("../helpers/checkLogin");
let checkConsumer = require("../helpers/checkConsumer");
let checkAction = require("../helpers/checkAction");
let checkQuotes = require("../helpers/checkQuotes");
let Consumer = require("../models/Consumer");
let Quotes = require("../models/Quotes");
module.exports = function(req, res){
	if(checkLogin(req)){
		if(checkConsumer(req)){
			new Consumer({id: req.query.consumer_id})
				.fetch()
				.then(model=>{
					if(model){
						if(checkQuotes(req)){
							if(checkAction(req)){
								new Quotes({consumer_id: req.query.consumer_id, id: req.body.quote_id})
									.fetch()
									.then(function(model){
										if(model){
											if(req.body.action == "accept"){
												if(model.toJSON().status == "pending"){
													new Quotes({id: req.body.quote_id, consumer_id: req.query.consumer_id})
														.save("status", "accepted", {method: "update"})
														.then(function(model){
															res.jsonp(model.toJSON());
														});
												}else if(model.toJSON().status == "accepted"){
													res.jsonp({error: "quote already accepted"});
												}else{
													res.jsonp({error: "quote already rejected"});
												}

											}else{
												if(model.toJSON().status == "pending"){
													new Quotes({id: req.body.quote_id, consumer_id: req.query.consumer_id}) 
														.save("status", "rejected", {method: "update"})
														.then(function(model){
															res.jsonp(model.toJSON());
														});
												}else if(model.toJSON().status == "accepted"){
													res.jsonp({error: "quote already accepted"});
												}else{
													res.jsonp({error: "quote already rejected"});
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