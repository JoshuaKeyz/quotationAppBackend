let handleConsumer = require('../helpers/handle_consumer');

module.exports = function handleContractor(model, req, res, Consumer, Quotes){
	if(!model){
		res.jsonp({status: 'Invalid contractor'});
	}
	
	new Consumer({id: req.body.consumer_id})
		.fetch()
		.then((model)=>{handleConsumer(model, req, res,  Quotes);});
};