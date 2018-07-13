module.exports = function reviewQuote(model, req, res, Quote){
	if(!model){
		res.jsonp({error: 'unregistered constractor'});
		return;
	}
    
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
						res.jsonp({status: 'success', reviewedQuote: model});
					});
			}else{
				res.jsonp({error: 'this quote doesn\'t exist'});
			}
		});
	
};
