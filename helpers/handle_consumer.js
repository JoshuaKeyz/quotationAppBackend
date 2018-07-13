module.exports = function handleConsumer(model, req, res, Quotes){
	if(model){
		new Quotes({
			contractor_id: req.body.contractor_id,
			consumer_id: req.body.consumer_id,
			labor: req.body.labor,
			expenses: req.body.expenses,
			sales_task: req.body.sales_task,
			miscellaneous: req.body.miscellaneous,
			total: req.body.total, 
			status: 'pending'
		})
			.save(null, {method: 'insert'})
			.then(function(data_model){
				res.jsonp({status: 'success', model: data_model.toJSON()});
			});
	}else{
		res.jsonp({error: 'Invalid consumer'});
	}
};