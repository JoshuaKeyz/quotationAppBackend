let Contractor = require("../models/Contractor");
let Quote = require("../models/Quotes");
let checkLogin = require("../helpers/checkLogin")
module.exports = (req, res)=>{
    if(checkLogin(req)){
        let contractor_id = req.query.contractor_id;
	new Contractor({id: contractor_id})
		.fetch()
		.then((model)=>{
			if(model){
				new Quote({id: req.body.quote_id})
					.fetch()
					.then(model=>{
						if(model){
							new Quote({id: req.body.quote_id})
								.save({labor: req.body.labor,
									expenses: req.body.expenses,
									sales_task: req.body.sales_task,
									miscellaneous: req.body.miscellaneous,
									total: req.body.total
								}, {method: 'update'})
								.then(model=>{
									res.jsonp({status: "success", reviewedQuote: model});
								});
						}else{
							res.jsonp({error: "this quote doesn't exist"});
						}
					});
			}else{
				res.jsonp({error: "unregistered constractor"});
			}
		});
    }else{
        res.jsonp({error: "not signedin"})
    }
	
};