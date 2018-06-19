let Contractor = require("../models/Contractor");
let Consumer = require("../models/Consumer");
let Quotes = require("../models/Quotes");
let validateQuoteFields = require("../helpers/validateQuoteFields");
module.exports = function(req, res){
	if(req.session.isLoggedIn){
		if(validateQuoteFields(req)){
			new Contractor({id: req.body.contractor_id})
			.fetch()
			.then((model)=>{
				if(model){
					new Consumer({id: req.body.consumer_id})
						.fetch()
						.then((model)=>{
							if(model){
								new Quotes({
									contractor_id: req.body.contractor_id,
									consumer_id: req.body.consumer_id,
									labor: req.body.labor,
									expenses: req.body.expenses,
									sales_task: req.body.sales_task,
									miscellaneous: req.body.miscellaneous,
									total: req.body.total, 
									status: "pending"
								})
									.save(null, {method: "insert"})
									.then(function(data_model){
										res.jsonp({status: "success", model: data_model.toJSON()});
									});
							}else{
								res.jsonp({error: "Invalid consumer"});
							}
						});
				}else{
					res.jsonp({status: "Invalid contractor"});
				}
			});
		}else{
			res.jsonp({error: "invalid quotation"})
		}
		
	}else{
		res.jsonp({error: "not signedIn"});
	}
};